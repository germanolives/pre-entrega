import { useState } from "react";
import { ImgWithSkeleton } from "../common/ImgWithSkeleton";
import { Button } from "../common/Button";
import TextareaAutosize from "react-textarea-autosize";
import { formatSlug } from "../../utils/formatSlug";
import { useModal } from "../../context/ModalContext";
import { ModalBox } from "../common/ModalBox";
import { offers as ALL_AVAILABLE_OFFERS } from "../../data/offers/offers";

export const DashboardItemDetail = ({
  dataForm,
  imagePreview, // 🌟 CORREGIDO: Ahora recibe el string blob temporal del contenedor
  handleSubmit,
  handleChange,
  handleRatingChange,
  handlePriceChange,
  handleStockChange,
  handleOfferToggle,
  handleImageChange,
}) => {
  const length = dataForm.title?.length || 0;
  const initialRows = length > 70 ? 3 : length > 35 ? 2 : 1;

  const BASE_CATEGORIES = [
    "",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  const CATEGORIES = BASE_CATEGORIES.map((cat) => ({
    id: cat,
    slug: formatSlug(cat),
  }));


  

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 w-full md:w-2/3 mx-auto gap-4"
    >
      {/* COLUMNA IZQUIERDA */}
      <div className="flex flex-col bg-gray-200 p-4 shadow-2xl border border-gray-300 h-full rounded-sm gap-2">
        {/* ID */}
        <div className="flex flex-col justify-between border border-gray-400 rounded-sm min-h-10.5 bg-transparent">
          <h6 className="text-xs italic text-gray-500 px-2 pt-0.5">id:</h6>
          <span className="text-xs text-blue-700 mt-auto leading-tight px-2 pb-1 grow flex items-center bg-gray-300/30 select-all font-mono">
            {dataForm.id}
          </span>
        </div>

        {/* CODE */}
        <div className="flex flex-col justify-between border border-gray-400 rounded-sm min-h-10.5">
          <label className="text-xs italic text-gray-500 px-2">code:</label>
          <input
            type="text"
            className="text-xs text-blue-700 mt-auto leading-tight px-2 pb-1 grow bg-transparent focus:outline-none"
            onChange={handleChange}
            name="code"
            value={dataForm.code}
            required
          />
        </div>

        {/* TITLE */}
        <div className="flex flex-col justify-between border border-gray-400 rounded-sm min-h-10.5">
          <label className="text-xs italic text-gray-500 px-2">title:</label>
          <TextareaAutosize
            className="text-xs text-blue-700 mt-auto leading-tight px-2 pb-1 grow resize-none overflow-hidden bg-transparent focus:outline-none"
            onChange={handleChange}
            name="title"
            value={dataForm.title}
            minRows={initialRows}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col justify-between border border-gray-400 rounded-sm min-h-10.5">
          <label className="text-xs italic text-gray-500 px-2">description:</label>
          <TextareaAutosize
            className="text-xs text-blue-700 mt-auto leading-tight px-2 pb-1 grow resize-none overflow-hidden bg-transparent focus:outline-none"
            onChange={handleChange}
            name="description"
            value={dataForm.description}
            minRows={initialRows + 2}
            required
          />
        </div>

        {/* RATING PANEL */}
        <div className="flex flex-col border border-gray-400 rounded-sm p-2 bg-gray-300/20 gap-2">
          <p className="text-xs italic text-gray-500 px-1">rating:</p>
          <div className="flex flex-col justify-between border border-gray-300 rounded-sm bg-white min-h-9">
            <label className="text-xxs italic text-gray-400 px-2 pt-0.5">rate:</label>
            <input
              type="text"
              className="text-xs text-blue-700 leading-tight px-2 pb-1 bg-transparent focus:outline-none" // 🌟 Corregido a bg-transparent
              onChange={handleRatingChange}
              name="rate"
              value={dataForm.rating.rate}
              required
            />
          </div>
          <div className="flex flex-col justify-between border border-gray-300 rounded-sm bg-white min-h-9">
            <label className="text-xxs italic text-gray-400 px-2 pt-0.5">count:</label>
            <input
              type="text"
              className="text-xs text-blue-700 leading-tight px-2 pb-1 bg-transparent focus:outline-none" // 🌟 Corregido a bg-transparent
              onChange={handleRatingChange}
              name="count"
              value={dataForm.rating.count}
              required
            />
          </div>
        </div>

        {/* TITLE SLUG */}
        <div className="flex flex-col justify-between border border-gray-400 rounded-sm min-h-10.5">
          <label className="text-xs italic text-gray-500 px-2">titleSlug:</label>
          <input
            type="text"
            className="text-xs text-blue-700 mt-auto leading-tight px-2 pb-1 grow bg-transparent focus:outline-none opacity-60"
            name="titleSlug"
            value={dataForm.titleSlug}
            readOnly
          />
        </div>

        {/* CATEGORY SLUG */}
        <div className="flex flex-col justify-between border border-gray-400 rounded-sm min-h-10.5">
          <label className="text-xs italic text-gray-500 px-2">categorySlug:</label>
          <input
            type="text"
            className="text-xs text-blue-700 mt-auto leading-tight px-2 pb-1 grow bg-transparent focus:outline-none opacity-60"
            name="categorySlug"
            value={dataForm.categorySlug}
            readOnly
          />
        </div>

        {/* CATEGORY SELECT */}
        <div className="flex flex-col justify-between border border-gray-400 rounded-sm min-h-10.5">
          <label className="text-xs italic text-gray-500 px-2">category:</label>
          <select
            className="text-xs text-blue-700 mt-auto leading-tight p-1 px-2 grow bg-transparent focus:outline-none cursor-pointer w-full"
            onChange={handleChange}
            name="category"
            value={dataForm.category}
            required
          >
            {CATEGORIES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* COLUMNA DERECHA */}
      <div className="p-4 shadow-2xl border border-gray-300 flex flex-col justify-between items-center bg-gray-50 rounded-sm h-full">
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col justify-between border border-gray-400 rounded-sm p-2 bg-white">
            <h6 className="text-xs italic text-gray-500 mb-2">image:</h6>
            <div className="w-2/3 aspect-square overflow-hidden bg-white border border-gray-100 rounded-sm mx-auto">
              {/* 🌟 CORREGIDO: Prioriza imagePreview si hay un archivo seleccionado, si no muestra la url de base */}
              <ImgWithSkeleton
                image={imagePreview || dataForm.image}
                className="object-contain p-2 transform transition-transform duration-500 ease-in-out hover:scale-105"
                size={"w-full h-full"}
              />            
            </div>
            <div className="flex flex-col justify-between border border-gray-400 rounded-sm my-0.5 min-h-10.5 p-1 bg-gray-50">
              <label className="text-xxs italic text-gray-400 px-1 truncate max-w-full">
                {imagePreview ? "New image selected" : `Current path: ${dataForm.image || "None"}`}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-xs text-blue-700 mt-auto leading-tight px-1 pb-1 grow bg-transparent focus:outline-none cursor-pointer file:mr-2 file:py-0.5 file:px-2 file:rounded-sm file:border-0 file:text-xs file:bg-cyan-50 file:text-cyan-700 file:font-semibold"
                name="image"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between border border-gray-400 rounded-sm my-0.5 min-h-10.5">
            <label className="text-xs italic text-gray-500 px-2">price (EUR):</label>
            <input
              type="text"
              onChange={handlePriceChange}
              className="text-xs text-blue-700 mt-auto leading-tight px-2 pb-1 grow bg-transparent focus:outline-none"
              name="price"
              value={dataForm.price}
              required
            />
          </div>

          <div className="flex flex-col justify-between border border-gray-400 rounded-sm my-0.5 min-h-10.5">
            <label className="text-xs italic text-gray-500 px-2">stock:</label>
            <input
              type="text"
              onChange={handleStockChange}
              className="text-xs text-blue-700 mt-auto leading-tight px-2 pb-1 grow bg-transparent focus:outline-none"
              name="stock"
              value={dataForm.stock}
              required
            />
          </div>

          {/* PANEL DE CHECKBOXES */}
          <div className="flex flex-col border border-gray-400 rounded-sm p-2 bg-white gap-1.5 w-full">
            <label className="text-xs italic text-gray-500">Apply cumulative discounts:</label>
            <div className="flex flex-col gap-1">
              {ALL_AVAILABLE_OFFERS.map((offer) => {
                const isChecked = dataForm.offers.some(
                  (productOffer) => productOffer.id === offer.id
                );

                return (
                  <div
                    key={offer.id}
                    className="flex items-center gap-2 p-1 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      id={`offer-${offer.id}`}
                      checked={isChecked}
                      onChange={() => handleOfferToggle(offer)}
                      className="w-3.5 h-3.5 text-cyan-600 rounded-sm cursor-pointer focus:ring-transparent"
                    />
                    <label
                      htmlFor={`offer-${offer.id}`}
                      className="text-[11px] text-blue-700 cursor-pointer select-none grow font-medium leading-tight"
                    >
                      {`${offer.title} (${offer.discount}% off - Minimum: ${offer.qty} units)`}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <Button
            variant="primary"
            type="submit"
            className="rounded-md py-2 uppercase mt-2 w-full font-bold tracking-wider"
          >
            Confirm and Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
};