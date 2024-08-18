import Example from "@/app/types/Example";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import useQueryParam from "@/lib/useQueryParam";

interface Props {
  examples: Example[];
  openModal: (arg: Example) => void;
  setIsAdding: (arg: boolean) => void;
}

export default function ExamplesList({
  examples,
  openModal,
  setIsAdding,
}: Props) {
  const selectedCategoryParam = useQueryParam("category");
  return (
    <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-fit">
      {examples &&
        examples.map((example) => (
          <Card
            className="bg-white hover:scale-110 hover:rotate-3 duration-150 transition-all p-6 rounded-xl border-blue-500 cursor-pointer h-48 flex flex-col justify-between"
            key={example.id}
            onClick={() => openModal(example)}
            style={{ boxShadow: "10px 10px 0px #0038FF" }}
          >
            <h3 className="font-bold text-lg mb-3 text-blue-600">
              {example.title}
            </h3>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">{example.duration}</p>
              <Badge className="bg-[#D5FF2C] px-4 py-2 rounded-full text-xs font-semibold text-slate-900 hover:bg-[#D5FF2C]">
                {example.tag}
              </Badge>
            </div>
          </Card>
        ))}

      {!selectedCategoryParam && (
        <Card
          className="flex flex-col gap-3 items-center justify-center hover:bg-blue-100 cursor-pointer duration-150 border-blue-500"
          onClick={() => setIsAdding(true)}
        >
          Add new example
          <button className="w-12 h-12 flex justify-center items-center text-blue-700 text-xl font-semibold bg-blue-200 rounded-full border border-blue-700 hover:bg-blue-300 duration-150">
            +
          </button>
        </Card>
      )}
    </div>
  );
}
