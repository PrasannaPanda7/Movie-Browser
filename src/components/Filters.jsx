"use client";

import { useState } from "react";
import { useMovieContext } from "@/context/MovieContext";

export default function Filters() {
  const { filters, setFilters } = useMovieContext();
  const [localFilters, setLocalFilters] = useState(filters);
  const [errors, setErrors] = useState({});

  const currentYear = new Date().getFullYear();

  const validateFilters = (filtersToValidate) => {
    const validationErrors = {};

    if (
      filtersToValidate.yearFrom &&
      (filtersToValidate.yearFrom < 1700 ||
        filtersToValidate.yearFrom > currentYear)
    ) {
      validationErrors.yearFrom = `Year must be between 1700 and ${currentYear}`;
    }
    if (
      filtersToValidate.yearTo &&
      (filtersToValidate.yearTo < 1700 ||
        filtersToValidate.yearTo > currentYear)
    ) {
      validationErrors.yearTo = `Year must be between 1700 and ${currentYear}`;
    }
    if (
      filtersToValidate.ratingFrom &&
      (filtersToValidate.ratingFrom < 0 || filtersToValidate.ratingFrom > 10)
    ) {
      validationErrors.ratingFrom = "Rating must be between 0 and 10";
    }
    if (
      filtersToValidate.ratingTo &&
      (filtersToValidate.ratingTo < 0 || filtersToValidate.ratingTo > 10)
    ) {
      validationErrors.ratingTo = "Rating must be between 0 and 10";
    }

    return validationErrors;
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being edited
    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  const applyFilters = () => {
    // Validate all filters on Apply
    const validationErrors = validateFilters(localFilters);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop applying filters if there are errors
    }

    setFilters(localFilters);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <select
          name="genre"
          value={localFilters.genre}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-500"
        >
          <option value="">Select Genre</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="27">Horror</option>
        </select>

        <div>
          <input
            type="number"
            name="yearFrom"
            placeholder="Year from"
            value={localFilters.yearFrom}
            onChange={handleFilterChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.yearFrom ? "border-red-500" : "border-gray-300"
            } text-gray-500`}
          />
          {errors.yearFrom && (
            <p className="text-red-500 text-sm mt-1">{errors.yearFrom}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            name="yearTo"
            placeholder="Year to"
            value={localFilters.yearTo}
            onChange={handleFilterChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.yearTo ? "border-red-500" : "border-gray-300"
            } text-gray-500`}
          />
          {errors.yearTo && (
            <p className="text-red-500 text-sm mt-1">{errors.yearTo}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            name="ratingFrom"
            placeholder="Rating from"
            value={localFilters.ratingFrom}
            onChange={handleFilterChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.ratingFrom ? "border-red-500" : "border-gray-300"
            } text-gray-500`}
          />
          {errors.ratingFrom && (
            <p className="text-red-500 text-sm mt-1">{errors.ratingFrom}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            name="ratingTo"
            placeholder="Rating to"
            value={localFilters.ratingTo}
            onChange={handleFilterChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.ratingTo ? "border-red-500" : "border-gray-300"
            } text-gray-500`}
          />
          {errors.ratingTo && (
            <p className="text-red-500 text-sm mt-1">{errors.ratingTo}</p>
          )}
        </div>
      </div>
      <button
        onClick={applyFilters}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
}
