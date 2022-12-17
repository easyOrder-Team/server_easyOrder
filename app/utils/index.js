const orderProduct = (dbData) => {
    allData = dbData.rows.map((d) => {
      return {
        id: d.id_products,
        name: d.name,
        description: d.description,
        price: d.price,
        image: d.image,
        stock: d.stock,
        prep_time: d.prep_time,
        category: [{ id: d.id_category, name: d.name_c }],
      };
    });
    let notRepeat = [];
  
    for (let i = 0; i < allData.length; i++) {
      if (notRepeat.findIndex((p) => p.id === allData[i].id) === -1)
        notRepeat.push(allData[i]);
      else {
        let index = notRepeat.findIndex((p) => p.id === allData[i].id);
        notRepeat[index].category = [
          ...notRepeat[index].category,
          ...allData[i].category,
        ];
      }
    }
    return notRepeat;
  };