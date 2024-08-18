"use client";
import Categories from "../../components/Categories";
import Example from "../types/Example";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { formatTitleForUrl } from "@/lib/formatTitleForUrl";
import useQueryParam from "@/lib/useQueryParam";
import AddExampleForm from "@/components/AddExampleForm";
import { Loader } from "@/components/ui/Loader";
import ExamplesList from "@/components/ExamplesList";

const MarketingDashboard = () => {
  const selectedCategoryParam = useQueryParam("category");
  const exampleParam = useQueryParam("example");
  const router = useRouter();

  const [selectedExample, setSelectedExample] = useState<Example | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  async function fetchExamples(query: string | null): Promise<Example[]> {
    const url = query ? `/api/examples?category=${query}` : "/api/examples";
    const { data } = await axios.get(url);
    return data;
  }

  const {
    data: examples,
    isLoading,
    error,
  } = useQuery(
    ["examples", selectedCategoryParam],
    () => fetchExamples(selectedCategoryParam),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (examples && exampleParam) {
      const exampleToSelect = examples.find(
        (example) => exampleParam === formatTitleForUrl(example.title)
      );

      if (exampleToSelect) {
        setSelectedExample(exampleToSelect);
      }
    }
  }, [examples, exampleParam]);

  const openModal = (example: Example) => {
    const formattedTitle = formatTitleForUrl(example.title);

    if (selectedCategoryParam) {
      router.push(
        `?category=${selectedCategoryParam}&example=${formattedTitle}`
      );
      return;
    }

    router.push(`?example=${formattedTitle}`);
  };

  const closeModal = () => {
    const hrefToPushOnClose = selectedCategoryParam
      ? `?category=${selectedCategoryParam}`
      : window.location.pathname;

    setSelectedExample(null);
    router.push(hrefToPushOnClose);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error happened: {(error as any)?.message}
      </div>
    );
  }

  return (
    <div className="p-[5%] bg-white text-gray-800 min-h-screen">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4 sm:mb-0">
          MY FIRST USERS
        </h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button className="hover:bg-blue-100 text-blue-500 transition-colors px-4 py-2 rounded-lg text-sm border border-blue-500">
            Get 6 new tips in your inbox every Monday
          </button>
          <button className="bg-[#D5FF2C] hover:scale-100 hover:-rotate-6 transition-all dauration-150 px-4 py-2 rounded-lg text-sm font-semibold text-slate-900">
            Yes Please :)
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 auto-rows-min">
        <Categories />

        {examples && (
          <ExamplesList
            examples={examples}
            openModal={openModal}
            setIsAdding={setIsAdding}
          />
        )}
      </div>

      {selectedExample && (
        <Modal title={selectedExample.title} onClose={closeModal}>
          <p>Duration: {selectedExample.duration}</p>
          <p>Tag: {selectedExample.tag}</p>
        </Modal>
      )}

      {isAdding && <AddExampleForm setIsAdding={setIsAdding} />}
    </div>
  );
};

export default MarketingDashboard;
