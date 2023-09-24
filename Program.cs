var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
//TODO: setup JWT auth config once we setup a token service.
//TODO: Setup db connection.

var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

app.Run();
