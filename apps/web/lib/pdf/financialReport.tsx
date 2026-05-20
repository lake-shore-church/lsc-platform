import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { Expense, ExpenseCategory, GivingFund, GivingRecord } from "@repo/db";

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 11, fontFamily: "Helvetica" },
  title: { fontSize: 18, marginBottom: 8, color: "#1B4F8A" },
  section: { marginTop: 20 },
  heading: { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
  line: { marginBottom: 4 },
  total: { marginTop: 12, fontSize: 12, fontWeight: "bold" },
  footer: { marginTop: 40, fontSize: 9, color: "#64748b" },
});

function sumByFund(records: GivingRecord[]): Record<GivingFund, number> {
  const out: Record<GivingFund, number> = {
    general: 0,
    building: 0,
    missions: 0,
    other: 0,
  };
  for (const r of records) {
    out[r.fund] += Number(r.amount);
  }
  return out;
}

function sumByCategory(expenses: Expense[]): Record<ExpenseCategory, number> {
  const out: Record<ExpenseCategory, number> = {
    staff_pastoral: 0,
    utilities: 0,
    venue_building: 0,
    missions: 0,
    events: 0,
    equipment: 0,
    technology: 0,
    administration: 0,
    other: 0,
  };
  for (const e of expenses) {
    out[e.category] += Number(e.amount);
  }
  return out;
}

export function FinancialReportPdf({
  year,
  income,
  expenses,
}: {
  year: number;
  income: GivingRecord[];
  expenses: Expense[];
}) {
  const incomeTotal = income.reduce((s, r) => s + Number(r.amount), 0);
  const expenseTotal = expenses.reduce((s, e) => s + Number(e.amount), 0);
  const byFund = sumByFund(income);
  const byCategory = sumByCategory(expenses);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>Lake Shore Church — West Loop</Text>
        <Text>Annual Financial Summary — {year}</Text>

        <View style={styles.section}>
          <Text style={styles.heading}>Income (giving)</Text>
          {Object.entries(byFund).map(([fund, amt]) =>
            amt > 0 ? (
              <Text key={fund} style={styles.line}>
                {fund}: ${amt.toFixed(2)}
              </Text>
            ) : null,
          )}
          <Text style={styles.total}>Total income: ${incomeTotal.toFixed(2)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Expenses</Text>
          {Object.entries(byCategory).map(([cat, amt]) =>
            amt > 0 ? (
              <Text key={cat} style={styles.line}>
                {cat}: ${amt.toFixed(2)}
              </Text>
            ) : null,
          )}
          <Text style={styles.total}>Total expenses: ${expenseTotal.toFixed(2)}</Text>
        </View>

        <Text style={styles.total}>
          Net balance: ${(incomeTotal - expenseTotal).toFixed(2)}
        </Text>
        <Text style={styles.footer}>Prepared by Director of Technology</Text>
      </Page>
    </Document>
  );
}
