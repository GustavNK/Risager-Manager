using RisagerManagerServer.Models;

namespace RisagerManagerServer.Models;
public static class DbInitializer
{
    public static async Task Initialize(RisagerContext context)
    {
        context.Database.EnsureCreated();

        if (!context.House.Any())
        {
            var houses = new House[]
            {
                new House{Id=1, Name="Røde Hus", Description="Huset ved vejen", NumberOfBeds=12, ImageSrc="https://www.sommerhus-siden.dk/Media/Sommerhussiden.dk/_Profiles/8ce764d7/ab660db4/Sommerhus_Sverige_172-68324.jpg?v=636069273698886393"},
                new House{Id=2, Name="Søhuset", Description="Huset ved søen", NumberOfBeds=7, ImageSrc="https://sorensenogson.dk/wp-content/uploads/2018/08/IMG_0722-2-e1568269983900.jpg"},
            };
            await context.House.AddRangeAsync(houses);
            context.SaveChanges();
        }
    }
}