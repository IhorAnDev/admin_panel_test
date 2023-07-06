// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useHttp} from "../../hooks/http.hook";
import {activeFilterChanged, filtersFetched, filtersFetching, filtersFetchingError} from "../../actions";
import Spinner from "../spinner/Spinner";
import classNames from "classnames";

const HeroesFilters = () => {

    const {filters, filterLoadingStatus, activeFilter} = useSelector(state => state.filterReducer);
    const dispatch = useDispatch();
    const {request} = useHttp();


    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()));
    }, [])

    if (filterLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filterLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const filtersRender = (arr) => {
        if (arr.length === 0) {
            return (
                <h5 className="text-center mt-5">Фильтры не найдены</h5>
            )
        }

        return arr.map(({name, label, className}) => {
            const btnClass = classNames('btn', className, {
                'active': activeFilter === name
            });
            return <button
                key={name}
                id={name}
                className={btnClass}
                onClick={() => dispatch(activeFilterChanged(name))}>{label}</button>
        })
    }

    const buttons = filtersRender(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
