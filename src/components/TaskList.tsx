"use client";

import { Task } from "@/types";
import TaskItem from "./TaskItem";

interface Props {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (updatedTask: Task) => void;
}

export default function TaskList({ tasks, onToggle, onDelete, onUpdate }: Props) {
    if (tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-24 h-24 mb-4 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                    <svg className="w-12 h-12 text-indigo-300 dark:text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">No tasks yet!</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Add a task above to get started.</p>
            </div>
        );
    }

    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.completed === b.completed) {
            return b.createdAt - a.createdAt;
        }
        return a.completed ? 1 : -1;
    });

    return (
        <div className="mt-6">
            <div className="space-y-3 pb-8">
                {sortedTasks.map((task) => (
                    <div key={task.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <TaskItem
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 font-medium">
                <span>{tasks.filter(t => !t.completed).length} items left</span>
                {tasks.some(t => t.completed) && (
                    <span className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => tasks.forEach(t => t.completed && onDelete(t.id))}>
                        Clear completed
                    </span>
                )}
            </div>
        </div>
    );
}
