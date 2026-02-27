"use client";

import { useState } from "react";
import { Task } from "@/types";

interface Props {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (updatedTask: Task) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onUpdate }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description || "");

    // Format timestamp back to datetime-local string format if it exists
    const getInitialDateStr = () => {
        if (!task.dueDate) return "";
        const d = new Date(parseInt(task.dueDate));
        // Need format: YYYY-MM-DDThh:mm
        return new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
    };

    const [editDueDate, setEditDueDate] = useState(getInitialDateStr());

    // Format timestamp to local date string for display
    const formatDueDate = (timestamp?: string) => {
        if (!timestamp) return null;
        const date = new Date(parseInt(timestamp));
        return date.toLocaleString('default', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isOverdue = task.dueDate && !task.completed && new Date(parseInt(task.dueDate)).getTime() < Date.now();

    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editTitle.trim()) return;

        onUpdate({
            ...task,
            title: editTitle.trim(),
            description: editDescription.trim() ? editDescription.trim() : undefined,
            dueDate: editDueDate ? new Date(editDueDate).getTime().toString() : undefined
        });
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditTitle(task.title);
        setEditDescription(task.description || "");
        setEditDueDate(getInitialDateStr());
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <form onSubmit={handleSaveEdit} className="p-4 mb-3 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-indigo-200 dark:border-indigo-900/50 animate-in fade-in duration-300">
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Task title"
                        autoFocus
                        className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-gray-800 dark:text-gray-100"
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Description (optional)"
                        className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm text-gray-700 dark:text-gray-300 min-h-[80px] resize-y"
                    />
                    <div className="flex items-center gap-3">
                        <label className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Due Date:
                        </label>
                        <input
                            type="datetime-local"
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                            className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm text-gray-700 dark:text-gray-300"
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!editTitle.trim()}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white transition-all shadow-sm"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        )
    }

    return (
        <div className={`group flex flex-col p-4 mb-3 rounded-xl transition-all duration-300 ${task.completed ? 'bg-gray-50 dark:bg-gray-800/30' : 'bg-white dark:bg-gray-800'} shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900`}>
            <div className="flex items-start justify-between">
                <label className="flex items-start gap-4 cursor-pointer flex-1">
                    <div className="relative flex items-center justify-center w-6 h-6 mt-1 flex-shrink-0">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggle(task.id)}
                            className="peer appearance-none w-6 h-6 rounded border-2 border-gray-300 dark:border-gray-600 checked:bg-indigo-500 checked:border-indigo-500 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800"
                        />
                        <svg
                            className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0 pr-4">
                        <span className={`text-lg font-medium transition-all truncate ${task.completed ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-800 dark:text-gray-100'}`}>
                            {task.title}
                        </span>

                        {task.description && (
                            <p className={`mt-1 text-sm transition-all line-clamp-2 ${task.completed ? 'text-gray-400 dark:text-gray-600' : 'text-gray-600 dark:text-gray-400'}`}>
                                {task.description}
                            </p>
                        )}

                        {task.dueDate && (
                            <div className={`flex items-center gap-1.5 mt-2 text-xs font-medium transition-colors ${task.completed ? 'text-gray-400 dark:text-gray-600' :
                                isOverdue ? 'text-red-500 dark:text-red-400' :
                                    'text-indigo-500 dark:text-indigo-400'
                                }`}>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {isOverdue && !task.completed && <span className="mr-1">Overdue:</span>}
                                <span>{formatDueDate(task.dueDate)}</span>
                            </div>
                        )}
                    </div>
                </label>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex-shrink-0">
                    <button
                        onClick={(e) => { e.preventDefault(); setIsEditing(true); }}
                        className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all focus:outline-none focus:opacity-100"
                        aria-label="Edit task"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all focus:outline-none focus:opacity-100"
                        aria-label="Delete task"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
