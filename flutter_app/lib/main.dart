import 'package:flutter/material.dart';
import 'screens/home_screen.dart';
import 'screens/login_screen.dart';
import 'services/api_service.dart';

void main() {
  runApp(const DiplomaCheckerApp());
}

class DiplomaCheckerApp extends StatefulWidget {
  const DiplomaCheckerApp({super.key});

  @override
  State<DiplomaCheckerApp> createState() => _DiplomaCheckerAppState();
}

class _DiplomaCheckerAppState extends State<DiplomaCheckerApp> {
  final ApiService _apiService = ApiService();
  String? _token;

  void _handleLogin(String token) {
    setState(() {
      _token = token;
    });
  }

  void _handleLogout() {
    setState(() {
      _token = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Diploma Checker',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
        useMaterial3: true,
      ),
      home: _token == null
          ? LoginScreen(apiService: _apiService, onLogin: _handleLogin)
          : HomeScreen(apiService: _apiService, token: _token!, onLogout: _handleLogout),
    );
  }
}
