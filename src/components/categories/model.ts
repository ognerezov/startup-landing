export interface Category{
    id : number
    name :string
    description : string | null | undefined
    parent :number | null | undefined
}

export const DEFAULT_CATEGORIES = [
    {
        "id": 1,
        "name": "Photography",
        "description": null,
        "parent": null
    },
    {
        "id": 2,
        "name": "Drones",
        "description": null,
        "parent": null
    },
    {
        "id": 3,
        "name": "Sports",
        "description": null,
        "parent": null
    },
    {
        "id": 4,
        "name": "Music",
        "description": null,
        "parent": null
    },
    {
        "id": 5,
        "name": "Tools",
        "description": null,
        "parent": null
    },
    {
        "id": 6,
        "name": "Gaming",
        "description": null,
        "parent": null
    },
    {
        "id": 7,
        "name": "Camping",
        "description": null,
        "parent": null
    },
    {
        "id": 8,
        "name": "For kids",
        "description": null,
        "parent": null
    },
    {
        "id": 9,
        "name": "For events",
        "description": null,
        "parent": null
    },
    {
        "id": 10,
        "name": "Other",
        "description": null,
        "parent": null
    }
]
