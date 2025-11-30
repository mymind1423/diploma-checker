import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import '../models/diploma.dart';
import '../services/api_service.dart';
import '../widgets/diploma_table.dart';
import '../widgets/primary_button.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({
    super.key,
    required this.apiService,
    required this.token,
    required this.onLogout,
  });

  final ApiService apiService;
  final String token;
  final VoidCallback onLogout;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool _loadingDiplomas = false;
  bool _uploading = false;
  List<Diploma> _diplomas = const [];
  String? _ocrResult;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchDiplomas();
  }

  Future<void> _fetchDiplomas() async {
    setState(() {
      _loadingDiplomas = true;
      _error = null;
    });

    try {
      final diplomas = await widget.apiService.fetchDiplomas();
      setState(() {
        _diplomas = diplomas;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
      });
    } finally {
      if (mounted) {
        setState(() {
          _loadingDiplomas = false;
        });
      }
    }
  }

  Future<void> _pickAndUpload() async {
    setState(() {
      _uploading = true;
      _ocrResult = null;
      _error = null;
    });

    try {
      final picker = ImagePicker();
      final pickedFile = await picker.pickImage(source: ImageSource.gallery);
      if (pickedFile == null) return;

      final text = await widget.apiService.uploadImage(File(pickedFile.path));
      setState(() {
        _ocrResult = text;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
      });
    } finally {
      if (mounted) {
        setState(() {
          _uploading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('OCR & Diplômes'),
        actions: [
          IconButton(
            onPressed: widget.onLogout,
            icon: const Icon(Icons.logout),
            tooltip: 'Logout',
          )
        ],
      ),
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _fetchDiplomas,
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              Card(
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            'OCR Upload',
                            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                          ),
                          PrimaryButton(
                            onPressed: _uploading ? null : _pickAndUpload,
                            text: _uploading ? 'Envoi...' : 'Choisir un fichier',
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      if (_ocrResult != null)
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: Colors.indigo.withOpacity(0.08),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            _ocrResult!,
                            style: const TextStyle(fontFamily: 'monospace'),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Card(
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            'Liste des diplômes',
                            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                          ),
                          IconButton(
                            onPressed: _loadingDiplomas ? null : _fetchDiplomas,
                            icon: const Icon(Icons.refresh),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      if (_loadingDiplomas)
                        const Center(child: CircularProgressIndicator())
                      else if (_error != null)
                        Text(
                          _error!,
                          style: const TextStyle(color: Colors.red),
                        )
                      else
                        DiplomaTable(diplomas: _diplomas),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
