"use client";
import axios from "axios";
import Categorie from "../app/types/Categorie";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import useQueryParam from "@/lib/useQueryParam";
import { Badge } from "./ui/badge";

export default function Categories() {
  async function fetchCategories(): Promise<Categorie[]> {
    const { data } = await axios.get("/api/categories");
    return data;
  }

  const router = useRouter();
  const selectedCategorie = useQueryParam("category");

  const { data: categories } = useQuery("categories", fetchCategories);
  return (
    <div className="lg:col-span-1">
      <button
        className={cn(
          "py-2 bg-blue-100 w-full rounded-md hover:bg-blue-200 duration-150 text-blue-600 mb-4",
          {
            "bg-blue-700 text-white": !selectedCategorie,
          }
        )}
        onClick={() => router.push(window.location.pathname)}
      >
        All
      </button>
      {categories &&
        categories.map((category, index) => (
          <div key={index} className="mb-6">
            <h2 className="font-bold text-lg mb-3 text-blue-600">
              {category.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item, itemIndex) => (
                <Badge
                  key={itemIndex}
                  className={cn(
                    `px-3 py-1 rounded-full text-sm cursor-pointer transition-colors bg-gray-200 hover:bg-gray-300 text-gray-700`,
                    {
                      "bg-blue-600 text-white": selectedCategorie === item,
                    }
                  )}
                  onClick={() => router.push(`?category=${item}`)}
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
