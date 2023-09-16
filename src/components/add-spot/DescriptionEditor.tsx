import React from "react";
import { IconList, IconMoodSmile } from "@tabler/icons-react";
import { useNewSpotStore } from "../../zustand/new-spot-store";

const DescriptionEditor = () => {
  const { description, setField } = useNewSpotStore((store) => store);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setField("description", e.target.value);
  };

  // const editorModules = {
  //   toolbar: [
  //     [{ header: "1" }, { header: "2" }, { font: [] }],
  //     [{ size: [] }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [
  //       { list: "ordered" },
  //       { list: "bullet" },
  //       { indent: "-1" },
  //       { indent: "+1" },
  //     ],
  //     ["link", "image", "video"],
  //     ["clean"],
  //   ],
  //   clipboard: {
  //     // toggle to add extra line breaks when pasting HTML:
  //     matchVisual: false,
  //   },
  // };

  return (
    <div className="flex flex-col gap-2 p-1">
      <label htmlFor="editor" className="text-xl">
        Opis łowiska
      </label>
      {/* <div className="min-h-[240px]">
        <ReactQuill
          style={{ height: "100%" }}
          value={description}
          onChange={(value) => setField("description", value)}
        />
      </div> */}
      <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600">
        <div className="flex items-center justify-between border-b px-3 py-2 dark:border-gray-600">
          <div className="flex flex-wrap items-center divide-gray-200 dark:divide-gray-600 sm:divide-x">
            <div className="flex items-center space-x-1 sm:pr-4">
              <button
                type="button"
                className="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <IconMoodSmile />
                <span className="sr-only">Dodaj emotikone</span>
              </button>
            </div>
            <div className="flex flex-wrap items-center space-x-1 sm:pl-4">
              <button
                type="button"
                className="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <IconList />
                <span className="sr-only">Dodaj liste</span>
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-b-lg">
          <textarea
            value={description}
            onChange={handleTextChange}
            id="editor"
            rows={8}
            className="block w-full border-0 bg-white px-4 py-2 text-base text-gray-800 focus:ring-0 dark:placeholder-gray-400"
            placeholder="Wprowadź opis..."
            required
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default DescriptionEditor;
