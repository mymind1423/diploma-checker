import 'package:flutter/material.dart';

import '../models/diploma.dart';

class DiplomaTable extends StatelessWidget {
  const DiplomaTable({super.key, required this.diplomas});

  final List<Diploma> diplomas;

  @override
  Widget build(BuildContext context) {
    if (diplomas.isEmpty) {
      return const Center(
        child: Padding(
          padding: EdgeInsets.symmetric(vertical: 24),
          child: Text('Aucun diplôme trouvé.'),
        ),
      );
    }

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: DataTable(
        columns: const [
          DataColumn(label: Text('Référence')),
          DataColumn(label: Text('Nom complet')),
          DataColumn(label: Text('Date de naissance')),
          DataColumn(label: Text('Filière')),
          DataColumn(label: Text('ID Étudiant')),
          DataColumn(label: Text('Mention')),
          DataColumn(label: Text('Date obtention')),
          DataColumn(label: Text('Grade')),
        ],
        rows: diplomas
            .map(
              (diploma) => DataRow(
                cells: [
                  DataCell(Text(diploma.reference)),
                  DataCell(Text(diploma.fullName)),
                  DataCell(Text(_formatDate(diploma.dateNaissance))),
                  DataCell(Text(diploma.filiere)),
                  DataCell(Text(diploma.idEtudiant)),
                  DataCell(Text(diploma.mention)),
                  DataCell(Text(diploma.dateObtention)),
                  DataCell(Text(diploma.grade)),
                ],
              ),
            )
            .toList(),
      ),
    );
  }

  String _formatDate(DateTime date) {
    final day = date.day.toString().padLeft(2, '0');
    final month = date.month.toString().padLeft(2, '0');
    final year = date.year;
    return '$day/$month/$year';
  }
}
