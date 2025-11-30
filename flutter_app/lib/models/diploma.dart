class Diploma {
  final String reference;
  final String fullName;
  final DateTime dateNaissance;
  final String filiere;
  final String idEtudiant;
  final String mention;
  final String dateObtention;
  final String grade;

  Diploma({
    required this.reference,
    required this.fullName,
    required this.dateNaissance,
    required this.filiere,
    required this.idEtudiant,
    required this.mention,
    required this.dateObtention,
    required this.grade,
  });

  factory Diploma.fromJson(Map<String, dynamic> json) {
    return Diploma(
      reference: json['reference'] as String,
      fullName: json['fullName'] as String,
      dateNaissance: DateTime.parse(json['dateNaissance'] as String),
      filiere: json['filiere'] as String,
      idEtudiant: json['idEtudiant'] as String,
      mention: json['mention'] as String,
      dateObtention: json['dateObtention'] as String,
      grade: json['grade'] as String,
    );
  }
}
