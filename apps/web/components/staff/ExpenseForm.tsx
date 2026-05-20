"use client";

import { addExpense } from "@/app/(staff)/staff/financials/actions";

export function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={addExpense} className="mt-6 grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="description" className="block text-sm font-semibold">
          Description
        </label>
        <input
          id="description"
          name="description"
          required
          className="mt-1 w-full min-h-[44px] rounded-md border border-default bg-surface px-3"
        />
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-semibold">
          Amount (USD)
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          required
          className="mt-1 w-full min-h-[44px] rounded-md border border-default bg-surface px-3"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-semibold">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={today}
          className="mt-1 w-full min-h-[44px] rounded-md border border-default bg-surface px-3"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-semibold">
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          className="mt-1 w-full min-h-[44px] rounded-md border border-default bg-surface px-3"
          defaultValue="administration"
        >
          <option value="staff_pastoral">Staff / pastoral</option>
          <option value="utilities">Utilities</option>
          <option value="venue_building">Venue / building</option>
          <option value="missions">Missions</option>
          <option value="events">Events</option>
          <option value="equipment">Equipment</option>
          <option value="technology">Technology</option>
          <option value="administration">Administration</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="min-h-[44px] rounded-md bg-brand-primary px-6 font-semibold text-white hover:opacity-90"
        >
          Add expense
        </button>
      </div>
    </form>
  );
}
