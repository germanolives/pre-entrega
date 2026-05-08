import { useState, useEffect } from "react";
import { Button } from "./common/Button";

export const SearchbarContainer = () => {
  useEffect(() => {}, []);

  return (
    <div className="w-full">
      <form className="flex p-2 gap-2 justify-evenly">
        <label htmlFor="" className="flex grow">
          <input
            className="flex grow border px-4 rounded-sm"
            type="text"
            placeholder="Ingrese el producto..."
          />
        </label>
        <Button variant="ghost" className="border rounded-sm">
          Ir
        </Button>
      </form>
    </div>
  );
};
