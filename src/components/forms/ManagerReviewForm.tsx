"use client";

import { useState } from "react";

import { toast } from "sonner";

import {
  submitManagerReview,
} from "@/services/reviewService";

export default function ManagerReviewForm() {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      employeeId: "",

      feedback: "",

      leadership: 5,

      communication: 5,

      technicalSkills: 5,

      rating: 5,
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await submitManagerReview(
          formData
        );

      console.log(response);

      toast.success(
        "Manager review submitted successfully"
      );

      // Reset form
      setFormData({
        employeeId: "",

        feedback: "",

        leadership: 5,

        communication: 5,

        technicalSkills: 5,

        rating: 5,
      });
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to submit manager review"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-white mb-6">
        Manager Review
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Employee Dropdown */}
        <div>
          <label className="text-zinc-300 block mb-2">
            Select Employee
          </label>

          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full bg-zinc-800 text-white rounded-xl p-4 outline-none border border-zinc-700 focus:border-purple-500 transition"
          >
            <option value="">
              Choose Employee
            </option>

            <option value="EMP101">
              EMP101 - John Doe
            </option>

            <option value="EMP102">
              EMP102 - Sarah Smith
            </option>

            <option value="EMP103">
              EMP103 - Mike Johnson
            </option>
          </select>
        </div>

        {/* Feedback */}
        <div>
          <label className="text-zinc-300 block mb-2">
            Feedback
          </label>

          <textarea
            name="feedback"
            placeholder="Write manager feedback..."
            value={formData.feedback}
            onChange={handleChange}
            rows={4}
            className="w-full bg-zinc-800 text-white rounded-xl p-4 outline-none border border-zinc-700 focus:border-purple-500 transition"
          />
        </div>

        {/* Leadership Rating */}
        <div>
          <label className="text-zinc-300 block mb-2">
            Leadership Rating
          </label>

          <input
            type="number"
            name="leadership"
            min="1"
            max="5"
            value={formData.leadership}
            onChange={handleChange}
            className="w-full bg-zinc-800 text-white rounded-xl p-4 outline-none border border-zinc-700 focus:border-purple-500 transition"
          />
        </div>

        {/* Communication Rating */}
        <div>
          <label className="text-zinc-300 block mb-2">
            Communication Rating
          </label>

          <input
            type="number"
            name="communication"
            min="1"
            max="5"
            value={formData.communication}
            onChange={handleChange}
            className="w-full bg-zinc-800 text-white rounded-xl p-4 outline-none border border-zinc-700 focus:border-purple-500 transition"
          />
        </div>

        {/* Technical Skills Rating */}
        <div>
          <label className="text-zinc-300 block mb-2">
            Technical Skills Rating
          </label>

          <input
            type="number"
            name="technicalSkills"
            min="1"
            max="5"
            value={formData.technicalSkills}
            onChange={handleChange}
            className="w-full bg-zinc-800 text-white rounded-xl p-4 outline-none border border-zinc-700 focus:border-purple-500 transition"
          />
        </div>

        {/* Overall Rating */}
        <div>
          <label className="text-zinc-300 block mb-2">
            Overall Rating
          </label>

          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            className="w-full bg-zinc-800 text-white rounded-xl p-4 outline-none border border-zinc-700 focus:border-purple-500 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Submitting..."
            : "Submit Manager Review"}
        </button>
      </form>
    </div>
  );
}