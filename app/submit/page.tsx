"use client";

import React, { useState } from "react";
import FormInput from "../components/FormInput";
import FormTextArea from "../components/FormTextArea";
import Pill from "../components/Pill";
import { filters } from "../data/filters";
import BottomNavbar from "../components/BottomNavbar";

/* ------------------ DATA ------------------ */

export const rolesList = [
  "Developer",
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Designer",
  "UX Designer",
  "UI Designer",
  "Motion Designer",
  "Creative Developer",
  "Founder",
  "Contributor",
  "Agency",
  "Art Director",
  "Other",
];

export const techList = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Firebase",
  "Supabase",
  "Three.js",
  "Vue.js",
  "Svelte",
  "Framer Motion",
  "Other",
];

interface Author {
  name: string;
  role: string[];
  website?: string;
}

/* ------------------ FORM ------------------ */

const SubmissionForm: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [websiteTitle, setWebsiteTitle] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const [authors, setAuthors] = useState<Author[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [authorWebsite, setAuthorWebsite] = useState("");
  const [authorRoles, setAuthorRoles] = useState<string[]>([]);

  const [technologies, setTechnologies] = useState<string[]>([]);

  /* ------------------ HELPERS ------------------ */

  const toggleValue = (
    value: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>,
    limit?: number
  ) => {
    if (state.includes(value)) {
      setState(state.filter((v) => v !== value));
      return;
    }
    if (limit && state.length >= limit) return;
    setState([...state, value]);
  };

  const addAuthor = () => {
    if (!authorName || authorRoles.length === 0) return;

    setAuthors([
      ...authors,
      { name: authorName, role: authorRoles, website: authorWebsite },
    ]);

    setAuthorName("");
    setAuthorWebsite("");
    setAuthorRoles([]);
  };

  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      imageFile,
      websiteTitle,
      websiteUrl,
      categories,
      description,
      authors,
      technologies,
    };

    console.log(payload);
    alert("Submitted — check console");
  };

  /* ------------------ UI ------------------ */

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 flex flex-col gap-8"
    >

      {/* WEBSITE INFO */}
      <section className="flex flex-col gap-4">
        <h2 className="form-heading">1. Website Info</h2>

        <FormInput
          label="Website Title"
          value={websiteTitle}
          onChange={(e) => setWebsiteTitle(e.target.value)}
          required
        />

        <FormInput
          label="Website URL"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          required
        />

        {/* CATEGORIES */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Categories</label>
            <span className="text-xs text-gray-500">
              {categories.length}/5 selected
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters
              .filter((f) => f.id !== "all")
              .map((filter) => (
                <Pill
                  key={filter.id}
                  label={filter.label}
                  icon={filter.icon}
                  selected={categories.includes(filter.id)}
                  disabled={
                    !categories.includes(filter.id) && categories.length >= 5
                  }
                  onClick={() =>
                    toggleValue(filter.id, categories, setCategories, 5)
                  }
                />
              ))}
          </div>
        </div>

        <FormTextArea
          label="Description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </section>

      {/* IMAGE UPLOAD */}
      <section className="flex flex-col gap-2">
        <h2 className="form-heading">2. Website Image (Landscape)</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="
            w-full
            text-sm
            text-gray-600
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:bg-black/5 file:text-black/70
            hover:file:bg-black/10
            cursor-pointer
          "
        />

        {imagePreview && (
          <div className="mt-2 w-full overflow-hidden rounded-lg bg-gray-100 aspect-video">
            <img
              src={imagePreview}
              alt="Website Preview"
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </section>


      {/* AUTHORS */}
      <section className="flex flex-col gap-4">
        <h2 className="form-heading">3. Authors</h2>

        <FormInput
          label="Author Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Role(s)</label>
          <div className="flex flex-wrap gap-2">
            {rolesList.map((role) => (
              <Pill
                key={role}
                label={role}
                selected={authorRoles.includes(role)}
                onClick={() => toggleValue(role, authorRoles, setAuthorRoles)}
              />
            ))}
          </div>
        </div>

        <FormInput
          label="Author Website (optional)"
          value={authorWebsite}
          onChange={(e) => setAuthorWebsite(e.target.value)}
        />

        <button
          type="button"
          onClick={addAuthor}
          className="self-start sans px-4 py-2 bg-black text-white rounded-full text-[16px] hover:bg-[#777777]"
        >
          Save
        </button>

        {authors.length > 0 && (
          <div className="border-t pt-3 flex flex-col gap-2">
            {authors.map((a, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
              >
                <div>
                  <p className="font-medium">{a.name}</p>
                  <p className="text-sm hidden">{a.role.join(", ")}</p>
                  {a.website && (
                    <p className="text-sm text-gray-500">{a.website}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeAuthor(i)}
                  className="text-sm text-red-500 hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#787878"
                  >
                    <path d="M220-450v-60h520v60H220Z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* TECHNOLOGIES */}
      <section className="flex flex-col gap-4">
        <h2 className="form-heading">4. Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {techList.map((tech) => (
            <Pill
              key={tech}
              label={tech}
              selected={technologies.includes(tech)}
              onClick={() => toggleValue(tech, technologies, setTechnologies)}
            />
          ))}
        </div>
      </section>

      <button
        type="submit"
        className="mt-4 px-6 py-3 bg-black sans text-white font-semibold rounded-full w-fit text-[16px] hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
};

export default SubmissionForm;
