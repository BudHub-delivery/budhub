interface LandingBulletProps {
  title: string;
  text: string;
}

const LandingBullet = (props: LandingBulletProps) => {
  const { title, text } = props;
  return (
    <div>
      <h3 className="text-neutral-800 font-bold">{ title }</h3>
      <p className="text-nunito text-neutral-200">{ text }</p>
  </div>
  )
}

export default LandingBullet