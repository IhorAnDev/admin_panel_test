// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import {useHttp} from "../../hooks/http.hook";
import {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {createHero} from "../heroesList/heroesSlice";

const HeroesAddForm = () => {

    const [heroName, setHeroName] = useState("");
    const [heroElement, setHeroElement] = useState("");
    const [heroDescription, setHeroDescription] = useState("");


    const {request} = useHttp();
    const dispatch = useDispatch();
    const {filters, filterLoadingStatus} = useSelector(state => state.filters);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: heroName,
            element: heroElement,
            description: heroDescription
        }
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(data => console.log(data, "Save hero"))
            .then(dispatch(createHero(newHero)))
            .catch(err => console.log(err));

        setHeroName('');
        setHeroElement('');
        setHeroDescription('');
    }

    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <option>Loading...</option>
        } else if (status === 'error') {
            return <option>Error</option>
        }

        return filters.map(({name, label}) => {
            if (name === 'all') return;
            return <option key={name} value={name}>{label}</option>;
        })
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={e => setHeroName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroDescription}
                    onChange={e => setHeroDescription(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option>Я владею элементом...</option>
                    {renderFilters(filters, filterLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;
