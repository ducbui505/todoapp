"use client";

import { useState } from "react";

export default function TaskInput({ onAdd }: { onAdd: (title: string, description?: string, dueDate?: string) => void }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd(
            title.trim(),
            description.trim() ? description.trim() : undefined,
            dueDate ? new Date(dueDate).getTime().toString() : undefined // Store as timestamp string for consistency
        );

        setTitle("");
        setDescription("");
        setDueDate("");
        setIsExpanded(false); // Collapse after adding
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 transition-all duration-300">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 px-4 py-3 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-3 rounded-xl text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all focus:outline-none"
                    aria-label="Toggle details"
                >
                    <svg className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <button
                    type="submit"
                    disabled={!title.trim()}
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 dark:disabled:bg-gray-700 text-white font-medium transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 active:scale-95 flex items-center justify-center"
                >
                    Add
                </button>
            </div>

            {/* Expanded section for description and due date */}
            <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="flex flex-col gap-3 pt-2">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description (optional)"
                            className="w-full px-4 py-2 rounded-xl bg-white/30 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 min-h-[80px] resize-y"
                        />
                        <div className="flex items-center gap-3">
                            <label className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                Due Date:
                            </label>
                            <input
                                type="datetime-local"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="px-3 py-1.5 rounded-lg bg-white/30 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm text-gray-700 dark:text-gray-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
