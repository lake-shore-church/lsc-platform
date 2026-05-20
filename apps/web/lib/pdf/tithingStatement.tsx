import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { GivingRecord } from "@repo/db";

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 11, fontFamily: "Helvetica" },
  title: { fontSize: 18, marginBottom: 8, color: "#1B4F8A" },
  subtitle: { fontSize: 12, marginBottom: 24, color: "#334155" },
  row: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#e2e8f0", paddingVertical: 6 },
  header: { fontWeight: "bold", backgroundColor: "#f1f5f9" },
  colDate: { width: "25%" },
  colFund: { width: "25%" },
  colAmount: { width: "25%", textAlign: "right" },
  colFreq: { width: "25%" },
  total: { marginTop: 16, fontSize: 13, fontWeight: "bold" },
  footer: { marginTop: 32, fontSize: 9, color: "#64748b" },
});

export function TithingStatementPdf({
  churchName,
  memberName,
  memberAddress,
  year,
  records,
  total,
}: {
  churchName: string;
  memberName: string;
  memberAddress?: string | null;
  year: number;
  records: GivingRecord[];
  total: number;
}) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>{churchName}</Text>
        <Text style={styles.subtitle}>Charitable Giving Statement — {year}</Text>
        <Text>{memberName}</Text>
        {memberAddress ? <Text>{memberAddress}</Text> : null}
        <View style={{ marginTop: 24 }}>
          <View style={[styles.row, styles.header]}>
            <Text style={styles.colDate}>Date</Text>
            <Text style={styles.colFund}>Fund</Text>
            <Text style={styles.colAmount}>Amount</Text>
            <Text style={styles.colFreq}>Frequency</Text>
          </View>
          {records.map((r) => (
            <View key={r.id} style={styles.row}>
              <Text style={styles.colDate}>{r.date}</Text>
              <Text style={styles.colFund}>{r.fund}</Text>
              <Text style={styles.colAmount}>${Number(r.amount).toFixed(2)}</Text>
              <Text style={styles.colFreq}>{r.frequency ?? "—"}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.total}>Total for {year}: ${total.toFixed(2)}</Text>
        <Text style={styles.footer}>
          No goods or services were provided in exchange for these contributions unless
          otherwise noted. Please retain this statement for your tax records.
        </Text>
      </Page>
    </Document>
  );
}
