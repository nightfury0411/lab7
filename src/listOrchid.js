const listOrchid = [
  {
    id: "1",
    name: "Taichung Beauty",
    rating: 5,
    isSpecial: true,
    image: "https://barritaorchids.com/cdn/shop/products/Cf592_1024x1024.jpg",
    color: "Pink",
    origin: "Taiwan",
    category: "Cattleya",
  },
  {
    id: "2",
    name: "Phalaenopsis Sogo",
    rating: 4.5,
    isSpecial: true,
    image:
      "https://hips.hearstapps.com/hmg-prod/images/brassia-orchid-types-1587738509.jpg?crop=1.00xw:0.833xh;0,0.0700xh&resize=980:*",
    color: "White",
    origin: "Taiwan",
    category: "Phalaenopsis",
  },
  {
    id: "3",
    name: "Dendrobium Nobile",
    rating: 4,
    isSpecial: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc6Vw_2ZkHeiKS9brhzal7SvupFBesx0rJSQ&s",
    color: "Purple",
    origin: "Himalayas",
    category: "Dendrobium",
  },
  {
    id: "4",
    name: "Vanda coerulea",
    rating: 4.5,
    isSpecial: true,
    image:
      "https://imgs.mongabay.com/wp-content/uploads/sites/30/2023/07/03103000/Foxtail_orchids_from_dandeli-e1688360454513.jpg",
    color: "Blue",
    origin: "India",
    category: "Vanda",
  },
  {
    id: "5",
    name: "Paphiopedilum Maudiae",
    rating: 4,
    isSpecial: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsyUzAUaioXKz77Kyerueij1_Z5onOapAv_w&s",
    color: "Green",
    origin: "Southeast Asia",
    category: "Paphiopedilum",
  },
  {
    id: "6",
    name: "Cymbidium Golden Elf",
    rating: 4.5,
    isSpecial: false,
    image:
      "https://www.regentway.in/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/c/f/cfl189602912.jpg",
    color: "Yellow",
    origin: "Asia",
    category: "Cymbidium",
  },
  {
    id: "7",
    name: "Oncidium Sharry Baby",
    rating: 4.8,
    isSpecial: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD9w3bSUoBJeM2UK3W-1PfPiYiMWLYv7YLkczs56xfbfV9oFoUbSPoQe56GQHUIY_btWg&usqp=CAU",
    color: "Red",
    origin: "Central America",
    category: "Oncidium",
  },
  {
    id: "8",
    name: "Miltoniopsis Bert Field",
    rating: 4,
    isSpecial: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS6aE-Xejkhkt6z_o9D0pEDYBY6j_ulrdtGW1WJ2SAmJ_g1WkQ7ME--lUC9FpgYgyX1UM&usqp=CAU",
    color: "Purple",
    origin: "Colombia",
    category: "Miltoniopsis",
  },
  {
    id: "9",
    name: "Cattleya Percivaliana",
    rating: 5,
    isSpecial: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3xpljl-ABkAotka2avy6YQISg-56dO_GOcw&s",
    color: "Pink",
    origin: "Venezuela",
    category: "Cattleya",
  },
  {
    id: "10",
    name: "Phalaenopsis Cornu-Cervi",
    rating: 4.2,
    isSpecial: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvwgvGG-frbw6gs8JRVTd-X5yYAaISvEPcSA&s",
    color: "Yellow",
    origin: "Southeast Asia",
    category: "Phalaenopsis",
  },
  {
    id: "11",
    name: "Bulbophyllum medusae",
    rating: 4.7,
    isSpecial: true,
    image:
      "https://www.marthastewart.com/thmb/wJHonksFnTIjsZb6Lpsj9IVw3b0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/dracula-monkey-orchid-2-0718-82daf5bdf9324ca08b6b3ac306e7fd3f.png",
    color: "White",
    origin: "Thailand",
    category: "Bulbophyllum",
  },
  {
    id: "12",
    name: "Dendrobium Kingianum",
    rating: 4,
    isSpecial: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcLW71O-3DSDCbbBBjhKIIWeJIvpZa3G-zUA&s",
    color: "Pink",
    origin: "Australia",
    category: "Dendrobium",
  },
  {
    id: "13",
    name: "Phragmipedium caudatum",
    rating: 4.6,
    isSpecial: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGuvG9NpXJGA5rWXNikdyhKqLYKQjUpwJ4xA&s",
    color: "Green",
    origin: "Peru",
    category: "Phragmipedium",
  },
  {
    id: "14",
    name: "Masdevallia veitchiana",
    rating: 4.5,
    isSpecial: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgU-f34_eHQx4MeSGumL4oEogcmcNZD06gA&s",
    color: "Orange",
    origin: "Peru",
    category: "Masdevallia",
  },
  {
    id: "15",
    name: "Cattleya Trianae",
    rating: 5,
    isSpecial: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsLP4BHW51eXiAEMyrcb5xRLR3DURT_xoTow&s",
    color: "Pink",
    origin: "Colombia",
    category: "Cattleya",
  },
  {
    id: "16",
    name: "Paphiopedilum",
    rating: 4.9,
    isSpecial: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtdFH9tA89LHMVbfXyUJkd9bg1ofUxf3KpjQ&s",
    color: "Green",
    origin: "Borneo",
    category: "Paphiopedilum",
  },
];

export default listOrchid;
