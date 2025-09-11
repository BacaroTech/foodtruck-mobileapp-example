import {
  DishView,
  ProductDTO,
} from 'src/models';

export const productMock: ProductDTO[] = [
    {
        name: 'Tacos de birra',
        description: 'descrione del tacos',
        basePrice: 10.50,
        adds: [
            { name: 'ketchup', price: 0.50 },
            { name: 'maionese', price: 0.50 },
        ],
        totalPriceAdds: 1,
        remove: 'senza fagioli e piccante',
        allergens: ['glutine', 'soia', 'glutine', 'soia', 'glutine', 'soia'],
        quantity: 1,
    },
    {
        name: 'Kebab',
        description: 'descrione del tacos',
        basePrice: 12.00,
        adds: [
            { name: 'ketchup', price: 0.50 },
            { name: 'maionese', price: 0.50 },
        ],
        totalPriceAdds: 1,
        remove: '',
        allergens: ['soia'],
        quantity: 3,
    },
];

export const dishesMock: DishView[] =
    [
        {
            name: 'Tacos de birra',
            description: 'Descrizione del tacos',
            price: 10.50,
            allergens: [
                {
                    'code': 'GLUTEN',
                    'name': 'glutine',
                },
                {
                    'code': 'SOY',
                    'name': 'soy',
                },
            ],
        },
        {
            name: 'Tacos 2',
            description: 'Descrizione del tacos più buono',
            price: 12.50,
            allergens: [
                {
                    'code': 'SOY',
                    'name': 'soy',
                },
            ],
        },
    ];
