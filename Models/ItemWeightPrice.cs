using Budhub.Enums;

namespace Budhub.Models;
public class ItemWeightPrice : BaseEntity
{
    public int ItemId {get;set;}
    public Item? Item {get;set;}

    public ItemWeight Weight {get;set;}
    public double Price {get;set;}
}