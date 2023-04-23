const obj = {
  completed: {
    name: "Completed",
    items: [
      {
        description: "Create Frontend 00000",
        owner: "Luffy",
      },
      {
        description: "Created Backend update query working 00001",
        owner: "Luffy",
      },
    ],
  },
  todos: {
    name: "Todos",
    items: [
      {
        description: "Create BE 00000",
        owner: "Mayanks",
      },
      {
        description: "Created Something 00001",
        owner: "Mayanks",
      },
    ],
  },
}

Object.entries(obj).map(([columnId, column], index) => {
  console.log("columnId ->", columnId)
  console.log("column ->", column)
  //
  console.log("\n")
  console.log("\n")
})

console.log("Object.entries(obj)", Object.entries(obj))
/*
- above will return 
- [ 
    [ completed, { name: '' , items: [] } ],
    [ todos, { name: '' , items: [] } ]
]
*/
