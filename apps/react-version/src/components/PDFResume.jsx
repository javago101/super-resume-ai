import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  section: { marginBottom: 20 },
  heading: { fontSize: 16, marginBottom: 6, fontWeight: "bold" },
  item: { marginBottom: 4 },
});

export default function PDFResume({ resume }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>{resume.hero.name}</Text>
          <Text>{resume.hero.intro}</Text>
          <Text>{resume.hero.goal}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>
          {resume.skills.map((skill, i) => (
            <Text key={i} style={styles.item}>• {skill}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Projects</Text>
          {resume.projects.map((project, i) => (
            <View key={i} style={styles.item}>
              <Text>{project.title}</Text>
              <Text>{project.description}</Text>
              <Text>{project.url}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          <Text>{resume.education.degree} - {resume.education.school}</Text>
          <Text>Graduation: {resume.education.graduation}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Contact</Text>
          <Text>Email: {resume.contact.email}</Text>
          <Text>Phone: {resume.contact.phone}</Text>
          <Text>GitHub: {resume.contact.github}</Text>
          <Text>LinkedIn: {resume.contact.linkedin}</Text>
        </View>
      </Page>
    </Document>
  );
}
