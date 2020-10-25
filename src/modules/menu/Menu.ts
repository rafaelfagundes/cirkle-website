type MainCategory = {
  title: string;
  active: boolean;
  categories: Record<string, SecondaryCategory>;
};

type SecondaryCategory = {
  title: string;
  active: boolean;
  link: string;
  items: Array<MenuItem>;
};

type MenuItem = {
  title: string;
  link: string;
};

type Menu = {
  women: MainCategory;
  kids: MainCategory;
};

export default Menu;

//EX:

// const MENU = {
//   women: {
//     title: "Mulher",
//     active: true,
//     categories: {
//       clothes: {
//         link: "/mulher/roupas",
//         title: "Roupas",
//         active: false,
//         items: [
//           {
//             title: "Vestidos",
//             link: "/produtos/a2bf02d1-801d-4066-a2f0-c8d4707c7586",
//           },
//           {
//             title: "Saias",
//             link: "/produtos/11e767cb-d2bb-476b-b358-a73e058ff6f4",
//           },
//           {
//             title: "Blusas",
//             link: "/produtos/927d008d-f8d0-4e4f-a5ef-b390966a65d7",
//           },
//         ],
//       },
//       purses: {
//         link: "/mulher/bolsas",
//         title: "Bolsas",
//         active: false,
//         items: [
//           {
//             title: "Mini",
//             link: "/produtos/18f2b1df-e9ef-439f-850e-0e1dcf03dabc",
//           },
//           {
//             title: "Média",
//             link: "/produtos/57dfa070-6e41-4b89-b2c0-c5eab7942491",
//           },
//           {
//             title: "Carteiras",
//             link: "/produtos/8964979e-32c1-4e45-b64e-25cf8710c043",
//           },
//         ],
//       },
//       shoes: {
//         link: "/mulher/calçados",
//         title: "Calçados",
//         active: false,
//         items: [
//           {
//             title: "Botas",
//             link: "/produtos/6d32681a-a23c-4f51-b92e-d70b2c67b592",
//           },
//           {
//             title: "Sapatos",
//             link: "/produtos/0e839446-a0f8-4f7f-9b87-c363127c537a",
//           },
//           {
//             title: "Tênis",
//             link: "/produtos/9a501b21-92f5-4c9d-a978-a83ed6748d25",
//           },
//         ],
//       },
//       acc: {
//         link: "/mulher/acessórios",
//         title: "Acessórios",
//         active: false,
//         items: [
//           {
//             title: "Acessórios para cabelo",
//             link: "/produtos/acessórios",
//           },
//           { title: "Anel", link: "/produtos/anel" },
//           { title: "Bijoux", link: "/produtos/bijoux" },
//           { title: "Brinco", link: "/produtos/brinco" },
//           { title: "Cachecol", link: "/produtos/cachecol" },
//           { title: "Carteiras", link: "/produtos/carteiras" },
//           { title: "Chapéus", link: "/produtos/chapéus" },
//           { title: "Chaveiros", link: "/produtos/chaveiros" },
//           { title: "Cintos", link: "/produtos/cintos" },
//           { title: "Colar", link: "/produtos/colar" },
//           { title: "Conjunto", link: "/produtos/conjunto" },
//           { title: "Fitness", link: "/produtos/fitness" },
//           { title: "Jóias", link: "/produtos/jóias" },
//           { title: "Lenços", link: "/produtos/lenços" },
//           { title: "Meias calças", link: "/produtos/meias" },
//           { title: "Óculos", link: "/produtos/óculos" },
//           { title: "Praia", link: "/produtos/praia" },
//           { title: "Pulseira", link: "/produtos/pulseira" },
//           { title: "Relógios", link: "/produtos/relógios" },
//           { title: "Outros", link: "/produtos/outros" },
//         ],
//       },
//       brands: {
//         link: "/mulher/marcas",
//         title: "Marcas",
//         active: false,
//         items: [
//           {
//             title: "Gucci",
//             link: "/produtos/cce65414-08a3-49ae-bd4a-52d5ae26a8c2",
//           },
//           {
//             title: "Chanel",
//             link: "/produtos/d0018e21-3805-47a5-8489-8c9e38e7cbba",
//           },
//           {
//             title: "Schutz",
//             link: "/produtos/ccec1135-389d-444a-8234-dda99385a12e",
//           },
//         ],
//       },
//     },
//   },
//   kids: {
//     title: "Kids",
//     active: false,
//     categories: {
//       clothes: {
//         link: "/kids/roupas",
//         title: "Roupas",
//         active: false,
//         items: [
//           {
//             title: "Vestidos",
//             link: "/produtos/c05d7945-bbd1-45b2-80da-a613e60dc60d",
//           },
//           {
//             title: "Saias",
//             link: "/produtos/4119c484-fde9-4191-a576-656218e3f9d7",
//           },
//           {
//             title: "Blusas",
//             link: "/produtos/3d2422de-736a-44ba-8fe0-ac5b19330d89",
//           },
//         ],
//       },
//       shoes: {
//         link: "/kids/calçados",
//         title: "Calçados",
//         active: false,
//         items: [
//           {
//             title: "Sandálias",
//             link: "/produtos/e85fb939-c2e4-4368-848a-5b23e0f5f4ac",
//           },
//           {
//             title: "Sapatos",
//             link: "/produtos/7834a69b-d4b4-4eaf-ad20-16bc39503c43",
//           },
//           {
//             title: "Tênis",
//             link: "/produtos/f5895cef-978a-4fce-9317-be631e5c342f",
//           },
//         ],
//       },
//       acc: {
//         link: "/kids/acessórios",
//         title: "Acessórios",
//         active: false,
//         items: [
//           {
//             title: "Óculos",
//             link: "/produtos/cccb7e40-64b3-4436-8c17-8fd04b200280",
//           },
//           {
//             title: "Relógios",
//             link: "/produtos/6502794d-57a2-49dd-b70c-b9e3345f2953",
//           },
//           {
//             title: "Brincos",
//             link: "/produtos/ab343b81-1ae0-4d47-8c80-dd4230522625",
//           },
//         ],
//       },
//       brands: {
//         link: "/kids/marcas",
//         title: "Marcas",
//         active: false,
//         items: [
//           {
//             title: "Gucci",
//             link: "/produtos/dc1b3ccf-54d8-417f-9c8d-9abbc75c827c",
//           },
//           {
//             title: "Chanel",
//             link: "/produtos/c7151c83-f1fd-4304-829f-2b71d3cd7c82",
//           },
//           {
//             title: "Schutz",
//             link: "/produtos/1ba3e928-a1c1-40e9-9ccf-9e14e44857de",
//           },
//         ],
//       },
//     },
//   },
// };
