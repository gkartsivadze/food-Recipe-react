import React, { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import { connect } from "react-redux";

function Categories({variable, updateVariable}) {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
            .then(data => data.json())
            .then(data => {
                let tempArr = [];
                data.categories.map(elem => {
                    tempArr.push(
                        {
                            id: elem.idCategory,
                            name: elem.strCategory,
                            thumb: elem.strCategoryThumb
                        }
                    )
                    setCategories(tempArr);
                })
            })
    }, [])
    return (<main id="categories_page">
        <h1 className="hero_text">CATEGORIES</h1>
        <section className="card_list_container">
            {categories.map(elem => {
                return <CategoryCard key={elem.id}
                                     categoryName={elem.name}
                                     categoryThumb={elem.thumb}
                                     />
            })}
        </section>
    </main>)

}

const mapStateToProps = (state) => ({
    variable: state.variable
  })
  
  const mapDispatchToProps = (dispatch) => ({
    updateVariable: (newVariable) => dispatch({ type: 'SYNCHRONIZE', payload: newVariable })
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Categories)