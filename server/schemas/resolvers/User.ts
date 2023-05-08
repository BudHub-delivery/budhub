
import { AuthenticationError } from "apollo-server-express";
import { IResolvers } from '@graphql-tools/utils';
import { signToken, isTokenExpired } from "../../utils/auth";
import User from '../../models';
import { Mailer } from '../../mailer/sendEmail';
import decode from 'jwt-decode'
import path from 'path'

require('dotenv').config({path: path.join(__dirname, '../.env')})

interface IUserArgs {
  email: string;
  firstName: string;
  password: string;
}

interface IUserToken {
  token: string;
  user: typeof User;
}

interface IToken {
  token: string;
}

interface IResetPasswordArgs {
  token: string;
  password: string;
}

class UserResolver {
  public async user(parent: any, { email }: IUserArgs) {
    return User.findOne({ email });
  }

  public async me(parent: any, args: any, context: any) {
    if (context.user) {
      return User.findOne({ email: context.user.email });
    }
    throw new AuthenticationError("You need to be logged in!");
  }

  public async addUser(parent: any, args: IUserArgs) {
    const email = args.email
    const existing = await User.findOne({ email })

    if(existing){
      throw new AuthenticationError("An account already exists with this Email. Please reset your password or try another email!");
    }
    
    const user = await User.create({ ...args });

    // Create a Token, pass other data into the Mailer Function
    const token = signToken(user, process.env.REG_RESET_EXP);
    const url = `${process.env.SITE_URL}/confirmation/${token}`;
    const mailer = new Mailer();
    await mailer.sendMail("confirm", args.email, url, args.firstName)

    return { token, user };
  }

  public async accountReg(parent: any, { token }: IToken){
    try{
      const decoded = decode(token) as { data: {_id: string}};
      const id = decoded.data._id
      const user = await User.findOneAndUpdate({_id: id}, {emailConfirmed: true})
      return (token)
    } catch (err){
      console.log(err);
    }
  }

  public async forgotPass(parent: any, { email }: IUserArgs) {
    const user = await User.findOne({ email: email })

    if(!user){ return }

    const token = signToken(user, process.env.REG_RESET_EXP);
    const url = `${process.env.SITE_URL}/reset/${token}`;
    const mailer = new Mailer();
    await mailer.sendMail("reset", user.email, url, user.firstName)

    return user;
  }

  public async resetPass(parent: any, { token, password }: IResetPasswordArgs) {
    try{
      const expiredToken = isTokenExpired(token)

      if(expiredToken) {
        throw new AuthenticationError('Your Password reset token has expired, please request a new token via the "Reset Password" link!')
      }

      const decoded = decode(token) as { data: {_id: string}};
      const id = decoded.data._id 

      const user = await User.findById(id, function(err: any, u: { password: string; save: () => void; }){
        if (err) {
          throw new AuthenticationError('There as an issue with updating your password, please try again later or request another reset link')
        };
        u.password = password;
        u.save()
      })

      return {token}
    } catch (err){
      console.log(err);
    }
  }

  public async login(parent: any, { email, password, firstName }: IUserArgs) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthenticationError("No user found with this email address");
    }

    if(!user.emailConfirmed){
        
      const token = signToken(user, process.env.REG_RESET_EXP);

      const url = `${process.env.SITE_URL}/confirmation/${token}`;

      const mailer = new Mailer();
      await mailer.sendMail("confirm", user.email, url, user.firstName)

      throw new AuthenticationError("Please confirm your email to login, another confirmation code has been sent!");
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new AuthenticationError("Incorrect credentials");
    }

    const token = signToken(user);

    return { token, user };

  }
};

const userResolver = new UserResolver();

const userResolvers: IResolvers = {
  Query: {
    user: userResolver.user.bind(userResolver),
    me: userResolver.me.bind(userResolver)
  },
  Mutation: {
    addUser: userResolver.addUser.bind(userResolver),
    accountReg: userResolver.accountReg.bind(userResolver),
    forgotPass: userResolver.forgotPass.bind(userResolver),
    resetPass: userResolver.resetPass.bind(userResolver),
    login: userResolver.login.bind(userResolver)
  }
}

export default userResolvers
