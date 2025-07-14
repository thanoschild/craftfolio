import React from "react";
import { LuTrendingUp, LuUsers } from "react-icons/lu";

export default function Preview() {
  return (
    <div className="relative">
      <div className="relative bg-light-bg dark:bg-dark-bg-sub border border-light-border-sub dark:border-dark-border-sub rounded-3xl shadow-xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
        <div className="flex items-center justify-between px-4 py-3 bg-light-bg-sub dark:bg-dark-bg border-b border-light-border-sub dark:border-dark-border-sub">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-light-bg dark:bg-dark-bg rounded-lg px-3 py-1.5 text-xs text-light-text-sub dark:text-dark-text-sub border border-light-border-sub dark:border-dark-border-sub">
              craftfolio.space/sumeet-portfolio
            </div>
          </div>
          <div className="w-6"></div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-light-text/10 to-light-text-sub/10 dark:from-dark-text/10 dark:to-dark-text-sub/10 rounded-2xl flex items-center justify-center font-bold text-xl text-light-text dark:text-dark-text border border-light-border-sub dark:border-dark-border-sub">
              SH
            </div>
            <div>
              <div className="text-xl font-bold text-light-text dark:text-dark-text">
                Sumeet Haldar
              </div>
              <div className="text-sm text-light-text-sub dark:text-dark-text-sub">
                Full Stack Developer
              </div>
              <div className="flex items-center gap-1 text-xs text-light-text-sub dark:text-dark-text-sub mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Available for work
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-light-text dark:text-dark-text">
              About
            </div>
            <div className="text-xs text-light-text-sub dark:text-dark-text-sub leading-relaxed">
              Passionate developer specializing in React, Node.js, and cloud
              technologies. Building scalable solutions for modern web.
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-light-text dark:text-dark-text">
              Skills
            </div>
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "TypeScript", "AWS"].map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-light-bg-sub dark:bg-dark-bg text-xs font-medium text-light-text dark:text-dark-text rounded-md border border-light-border-sub dark:border-dark-border-sub"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button className="px-3 py-1.5 bg-light-text dark:bg-dark-text text-light-bg dark:text-dark-bg text-xs font-medium rounded-lg hover:bg-light-text-sub dark:hover:bg-dark-text-sub transition-colors">
              Contact
            </button>
            <button className="px-3 py-1.5 border border-light-border-sub dark:border-dark-border-sub text-light-text dark:text-dark-text text-xs font-medium rounded-lg hover:border-light-text dark:hover:border-dark-text transition-colors">
              Resume
            </button>
          </div>
        </div>
      </div>

      <div className="absolute -top-8 -right-8 bg-light-bg dark:bg-dark-bg-sub border border-light-border-sub dark:border-dark-border-sub rounded-xl p-3 shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300">
        <div className="flex items-center gap-2">
          <LuTrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-xs font-medium text-light-text dark:text-dark-text">
            Portfolio Views
          </span>
        </div>
        <div className="text-lg font-bold text-light-text dark:text-dark-text">
          2.4K
        </div>
      </div>

      <div className="absolute -bottom-6 -left-6 bg-light-bg dark:bg-dark-bg-sub border border-light-border-sub dark:border-dark-border-sub rounded-xl p-3 shadow-lg transform -rotate-12 hover:-rotate-6 transition-transform duration-300">
        <div className="flex items-center gap-2">
          <LuUsers className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-medium text-light-text dark:text-dark-text">
            Profile Visits
          </span>
        </div>
        <div className="text-lg font-bold text-light-text dark:text-dark-text">
          847
        </div>
      </div>
    </div>
  );
}
