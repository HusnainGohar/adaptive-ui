"use client";

import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { PERSONA_LIST } from "../config/personas";
import { usePersona } from "../context/PersonaContext";

export default function PersonaSwitcher() {
  const { persona } = usePersona();
  const { currentPersona, setCurrentPersona } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const currentPersonaData = PERSONA_LIST.find((p) => p.key === currentPersona);

  useEffect(() => {
    console.log(currentPersona, persona);

    setCurrentPersona(persona);
  }, [persona]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow duration-200 min-w-[280px]"
      >
        <span className="text-xl">{currentPersonaData?.icon}</span>
        <div className="flex-1 text-left">
          <div className="font-medium text-gray-900">
            {currentPersonaData?.name}
          </div>
          <div className="text-sm text-gray-500 truncate">
            {currentPersonaData?.description}
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {PERSONA_LIST.map((persona) => (
            <button
              key={persona.key}
              onClick={() => {
                setCurrentPersona(persona.key);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                currentPersona === persona.key
                  ? "bg-blue-50 border-r-2 border-blue-500"
                  : ""
              }`}
            >
              <span className="text-xl">{persona.icon}</span>
              <div className="flex-1">
                <div
                  className={`font-medium ${currentPersona === persona.key ? "text-blue-900" : "text-gray-900"}`}
                >
                  {persona.name}
                </div>
                <div className="text-sm text-gray-500">
                  {persona.description}
                </div>
              </div>
              {currentPersona === persona.key && (
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
