import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { getGenres } from "../api/Api";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ReactSlider from "react-slider";
import ReactStars from "react-stars";

const Filter = () => {
  const animatedComponents = makeAnimated();
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [itemsSelected, setItemsSelected] = useState([]);
  const [valueSlider, setValueSlider] = useState([1900, 2023]);
  const [rating, setRating] = useState(0);

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["movies"],
    queryFn: getGenres,
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  const optionsGenre = data.genres.map((elemento) => {
    return { value: `${elemento.id}`, label: `${elemento.name}` };
  });

  console.log(itemsSelected);

  return (
    <div className="container mx-auto px-1 sm:px-4 py-2 flex items-center text-sm sm:text-base">
      <div className="flex items-center">
        <FaFilter className="mr-1" />
        <span>Filtros:</span>
      </div>
      <div className="w-full px-3 py-1 items-center sm:flex">
        <div className="mb-1 sm:mb-0 sm:w-3/4 md:w-1/2">
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={optionsGenre ? optionsGenre : options}
            placeholder="Por género"
            theme={(theme) => ({
              ...theme,
              //borderRadius: 2,
              colors: {
                ...theme.colors,
                primary25: "#EEEEEE",
                primary50: "#DCDEDC",
                primary: "grey",
              },
            })}
            onChange={(data) => setItemsSelected(data)}
          />
        </div>
        <div className="mb-1 sm:mb-0 sm:ml-2">
          <p>Por año:</p>
          <p className="flex justify-between">
            <span>{valueSlider[0]}</span>
            <span>{valueSlider[1]}</span>
          </p>
          <div className="w-72">
            <ReactSlider
              className="slider"
              onChange={setValueSlider}
              value={valueSlider}
              min={1900}
              max={2023}
            />
          </div>
        </div>
        <div className="sm:ml-2">
          <p>Por Rating:</p>
          <ReactStars
            count={5}
            onChange={(rating) => {
              setRating(rating);
            }}
            size={24}
            color2={"#ffd700"}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
