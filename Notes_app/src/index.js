import { getNotes, createNote, removeNote, updateNote } from "./notes";
import { getFilters, setFilters } from "./filters";

// console.log(getNotes());
// createNote();

// removeNote("bb69c0ef-f7fb-41aa-bd30-3c7bc13bfc11");

// updateNote("93942258-b254-4e3b-8872-583309a4ddd9", {
//   title: "My note title",
//   body: "My body",
// });

// console.log(getNotes());

console.log(getFilters());
setFilters({
  searchText: "office 2",
  sortBy: "byCreated",
});
console.log(getFilters());
