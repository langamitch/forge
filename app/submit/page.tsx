"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import FormInput from "../components/FormInput";
import FormTextArea from "../components/FormTextArea";
import Pill from "../components/Pill";
import { filters } from "../data/filters";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ------------------ VALIDATION HELPERS ------------------ */
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    if (!imageFile) return "Website image is required";
    if (!websiteTitle.trim()) return "Website title is required";
    if (!websiteUrl.trim()) return "Website URL is required";
    if (!isValidUrl(websiteUrl)) return "Please enter a valid URL";
    if (categories.length === 0) return "At least one category is required";
    if (authors.length === 0) return "At least one author is required";
    if (technologies.length === 0) return "At least one technology is required";
    // Uncomment if image is required:
    // if (!imageFile) return "Website image is required";
    return null;
  };

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

  /* ------------------ SUBMIT HANDLER ------------------ */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      // Upload image to Supabase Storage (media bucket)
      let imagePath = null;
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        console.log("Uploading image:", fileName);
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("media")
          .upload(fileName, imageFile);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw uploadError;
        }
        imagePath = uploadData.path;
        console.log("Uploaded image path:", imagePath);
      }

      // Insert form data into Supabase (status defaults to 'pending')
      const { error } = await supabase.from("website_submissions").insert([
        {
          website_title: websiteTitle,
          website_url: websiteUrl,
          categories,
          description,
          authors,
          technologies,
          image_path: imagePath,
        },
      ]);

      if (error) throw error;

      alert(
        "Form submitted successfully! Your submission is pending approval."
      );
      // Reset form
      setWebsiteTitle("");
      setWebsiteUrl("");
      setCategories([]);
      setDescription("");
      setAuthors([]);
      setTechnologies([]);
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      <button className="absolute top-5 left-5 rounded-full bg-black/5 p-2 z-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#1f1f1f"
        >
          <path d="M560-253.85 333.85-480 560-706.15 602.15-664l-184 184 184 184L560-253.85Z" />
        </svg>
      </button>

      <div className="lg:w-1/2 bg-gray-50 p-10 flex flex-col justify-center">
        <h1 className="text-[24px] font-bold mb-4">Submit Website</h1>
        <p className="sans text-black text-[18px] muted tracking-tight mb-4">
          Show off your project to the community and gain global visibility.
        </p>
      </div>

      <div className="lg:w-1/2 p-6 relative">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 overflow-y-auto max-h-screen no-scrollbar"
        >
          {/* IMAGE UPLOAD */}
          <section className="flex flex-col gap-2">
            <h2 className="form-heading">1. Website Image (Landscape)</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-black/5 file:text-black/70 hover:file:bg-black/10 cursor-pointer"
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

          {/* WEBSITE INFO */}
          <section className="flex flex-col gap-4">
            <h2 className="form-heading">2. Website Info</h2>
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
                        !categories.includes(filter.id) &&
                        categories.length >= 5
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
                    onClick={() =>
                      toggleValue(role, authorRoles, setAuthorRoles)
                    }
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
                  onClick={() =>
                    toggleValue(tech, technologies, setTechnologies)
                  }
                />
              ))}
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 px-6 py-3 bg-black sans text-white font-semibold rounded-full w-fit text-[16px] hover:bg-green-700 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;
