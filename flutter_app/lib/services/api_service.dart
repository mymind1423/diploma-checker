import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;

import '../models/diploma.dart';

class ApiService {
  ApiService({http.Client? client}) : _client = client ?? http.Client();

  final http.Client _client;
  final String _baseUrl = 'http://localhost:3000/api';
  String? _token;

  Future<String> login({required String username, required String password}) async {
    final response = await _client.post(
      Uri.parse('$_baseUrl/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'username': username, 'password': password}),
    );

    if (response.statusCode != 200) {
      throw Exception(_decodeError(response.body));
    }

    final body = jsonDecode(response.body) as Map<String, dynamic>;
    final token = body['token'] as String?;
    if (token == null) {
      throw Exception('Token manquant dans la réponse.');
    }

    _token = token;
    return token;
  }

  Future<String> uploadImage(File file) async {
    if (_token == null) throw Exception('Aucun token JWT enregistré.');

    final request = http.MultipartRequest('POST', Uri.parse('$_baseUrl/ocr'))
      ..headers['Authorization'] = 'Bearer $_token'
      ..files.add(await http.MultipartFile.fromPath('image', file.path));

    final streamedResponse = await request.send();
    final response = await http.Response.fromStream(streamedResponse);

    if (response.statusCode != 200) {
      throw Exception(_decodeError(response.body));
    }

    final body = jsonDecode(response.body) as Map<String, dynamic>;
    return body['text'] as String? ?? '';
  }

  Future<List<Diploma>> fetchDiplomas() async {
    if (_token == null) throw Exception('Aucun token JWT enregistré.');

    final response = await _client.get(
      Uri.parse('$_baseUrl/diplomes'),
      headers: {'Authorization': 'Bearer $_token'},
    );

    if (response.statusCode != 200) {
      throw Exception(_decodeError(response.body));
    }

    final body = jsonDecode(response.body) as List<dynamic>;
    return body
        .map((json) => Diploma.fromJson(json as Map<String, dynamic>))
        .toList();
  }

  String _decodeError(String rawBody) {
    try {
      final body = jsonDecode(rawBody) as Map<String, dynamic>;
      return (body['error'] ?? body['message'] ?? 'Erreur inconnue').toString();
    } catch (_) {
      return 'Erreur réseau (${rawBody.trim()})';
    }
  }
}
