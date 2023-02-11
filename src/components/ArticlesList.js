import { Component } from "react";

import { getArticlesByQuery } from '../services/api'
import Article from "./Article";

export default class ArticleList extends Component{
    state = {
        articles: []
    }

    async componentDidMount(){
        const articles = await getArticlesByQuery('react')
        this.setState({articles})
    }

    render(){
        const { articles } = this.state;
        if(!articles.length){
            return <div>Loading...</div>
        }
        return (
            <div>
            <form onSubmit={
                async (event) => {
                    event.preventDefault()
                    const articles = await getArticlesByQuery(event.currentTarget.elements[0].value)
                    this.setState({articles})
                }

            }>
                <input placeholder="Ведіть запит.."></input>
                <button>Пошук</button>
                </form>
                <ul>
                    {
                        articles.map((article) => {
                            return (
                                <Article article={article} key={article.objectID}/>
                            )
                        })
                    }
                </ul>   
            </div>

        )
    }
}