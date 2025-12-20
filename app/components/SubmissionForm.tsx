"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { filters } from "../data/filters";
import { ArrowLeft, Trash2, UploadCloud } from "lucide-react";

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
      let imagePath = null;
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("media")
          .upload(fileName, imageFile);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw uploadError;
        }
        imagePath = uploadData.path;
      }

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
    <div className="min-h-screen bg-white ">
      <div  className="max-w-4xl mx-auto mb-12 text-center mt-12 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit Your Website</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Showcase your project to our global community and gain visibility.
        </p>
      </div>

      <Card className="w-full max-w-4xl mx-auto">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 left-4"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            {/* IMAGE UPLOAD */}
<div className="space-y-4">
  <Label htmlFor="image">Website Image (Landscape)</Label>
  <Card
    className="border-2 border-dashed border-gray-300 hover:border-gray-500 transition-colors p-6 text-center cursor-pointer"
    onClick={() => document.getElementById("image")?.click()}
  >
    <div className="flex flex-col items-center gap-4">
      <UploadCloud className="h-10 w-10 text-gray-400" />
      {imagePreview ? (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Website Preview"
            className="w-64 h-36 object-cover rounded-lg"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              setImagePreview(null);
              setImageFile(null);
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500">
            Drag & drop or click to upload
          </p>
          <p className="text-xs text-gray-400">Recommended: 1200x630px (Landscape)</p>
        </>
      )}
    </div>
    <Input
      id="image"
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="hidden"
    />
  </Card>
</div>


            {/* WEBSITE INFO */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Website Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="websiteTitle">Website Title</Label>
                  <Input
                    id="websiteTitle"
                    value={websiteTitle}
                    onChange={(e) => setWebsiteTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL</Label>
                  <Input
                    id="websiteUrl"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Categories (Max 5)</Label>
                <div className="flex flex-wrap gap-2">
                  {filters
                    .filter((f) => f.id !== "all")
                    .map((filter) => (
                      <Badge
                        key={filter.id}
                        variant={
                          categories.includes(filter.id)
                            ? "default"
                            : "secondary"
                        }
                        onClick={() =>
                          toggleValue(filter.id, categories, setCategories, 5)
                        }
                        className="cursor-pointer flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {filter.icon}
                        </span>
                        {filter.label}
                      </Badge>
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your website..."
                />
              </div>
            </div>

            {/* AUTHORS */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Authors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="authorName">Author Name</Label>
                  <Input
                    id="authorName"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authorWebsite">
                    Author Website (Optional)
                  </Label>
                  <Input
                    id="authorWebsite"
                    value={authorWebsite}
                    onChange={(e) => setAuthorWebsite(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Role(s)</Label>
                <div className="flex flex-wrap gap-2">
                  {rolesList.map((role) => (
                    <Badge
                      key={role}
                      variant={
                        authorRoles.includes(role) ? "default" : "secondary"
                      }
                      onClick={() =>
                        toggleValue(role, authorRoles, setAuthorRoles)
                      }
                      className="cursor-pointer"
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button type="button" onClick={addAuthor} className="mt-2">
                Add Author
              </Button>
              {authors.length > 0 && (
                <div className="space-y-2">
                  <Label>Added Authors</Label>
                  <div className="space-y-2">
                    {authors.map((author, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{author.name}</p>
                          <p className="text-sm text-gray-500">
                            {author.role.join(", ")}
                          </p>
                          {author.website && (
                            <p className="text-sm text-gray-400">
                              {author.website}
                            </p>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAuthor(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* TECHNOLOGIES */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {techList.map((tech) => (
                  <Badge
                    key={tech}
                    variant={
                      technologies.includes(tech) ? "default" : "secondary"
                    }
                    onClick={() =>
                      toggleValue(tech, technologies, setTechnologies)
                    }
                    className="cursor-pointer"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit Website"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionForm;
