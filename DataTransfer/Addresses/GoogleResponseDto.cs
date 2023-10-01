using Budhub.DataTransfer.Addresses;

namespace Budhub.DataTransfer.Addresses;
public class GoogleResponse
{
    public string? Status { get; set; }
    public Result[]? Results { get; set; }
}

public class Result
{
    public AddressComponent[]? Address_Components { get; set; }
    public Geometry? Geometry { get; set; }
}

public class AddressComponent
{
    public string? Long_Name { get; set; }
    public string? Short_Name { get; set; }
    public string[]? Types { get; set; }
}

public class Geometry
{
    public Location? Location { get; set; }
}

public class Location
{
    public double? Lat { get; set; }
    public double? Lng { get; set; }
}