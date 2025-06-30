"use client"

import type React from "react"

import { AppSidebar } from "../../components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Upload, Download, Trash2, Eye, Search, Bell, Plus, File, ImageIcon, Video } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const documents = [
  {
    id: 1,
    name: "Estatuto da Comunidade Caminho 4D",
    type: "pdf",
    size: "2.4 MB",
    uploadedBy: "Pe. João Silva",
    uploadDate: "2024-01-15",
    category: "Documentos Oficiais",
    downloads: 45,
  },
  {
    id: 2,
    name: "Manual do Coordenador",
    type: "pdf",
    size: "1.8 MB",
    uploadedBy: "Diác. Carlos Ferreira",
    uploadDate: "2024-01-10",
    category: "Formação",
    downloads: 32,
  },
  {
    id: 3,
    name: "Cronograma de Atividades 2024",
    type: "xlsx",
    size: "156 KB",
    uploadedBy: "Ana Costa",
    uploadDate: "2024-01-08",
    category: "Planejamento",
    downloads: 28,
  },
  {
    id: 4,
    name: "Fotos do Retiro de Carnaval",
    type: "zip",
    size: "45.2 MB",
    uploadedBy: "Maria Santos",
    uploadDate: "2024-03-05",
    category: "Eventos",
    downloads: 67,
  },
  {
    id: 5,
    name: "Ata da Reunião - Março 2024",
    type: "docx",
    size: "234 KB",
    uploadedBy: "Lucia Mendes",
    uploadDate: "2024-03-20",
    category: "Atas",
    downloads: 15,
  },
  {
    id: 6,
    name: "Vídeo de Apresentação da Comunidade",
    type: "mp4",
    size: "125 MB",
    uploadedBy: "Paulo Santos",
    uploadDate: "2024-02-28",
    category: "Mídia",
    downloads: 89,
  },
]

export default function DocumentosPage() {
  const [documentList, setDocumentList] = useState(documents)
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadCategory, setUploadCategory] = useState("")
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadFile(file)
    }
  }

  const handleUploadSubmit = () => {
    if (!uploadFile || !uploadCategory) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, selecione um arquivo e uma categoria.",
        variant: "destructive",
      })
      return
    }

    const newDocument = {
      id: Math.max(...documentList.map((d) => d.id)) + 1,
      name: uploadFile.name,
      type: uploadFile.name.split(".").pop() || "file",
      size: `${(uploadFile.size / 1024 / 1024).toFixed(1)} MB`,
      uploadedBy: "Pe. João Silva",
      uploadDate: new Date().toISOString().split("T")[0],
      category: uploadCategory,
      downloads: 0,
    }

    setDocumentList((prev) => [newDocument, ...prev])
    setUploadFile(null)
    setUploadCategory("")
    setIsUploadDialogOpen(false)

    toast({
      title: "📄 Documento enviado",
      description: "O arquivo foi carregado com sucesso.",
    })
  }

  const handleDownload = (documentId: number) => {
    setDocumentList((prev) =>
      prev.map((doc) => (doc.id === documentId ? { ...doc, downloads: doc.downloads + 1 } : doc)),
    )

    toast({
      title: "⬇️ Download iniciado",
      description: "O arquivo está sendo baixado.",
    })
  }

  const handleDelete = (documentId: number) => {
    setDocumentList((prev) => prev.filter((doc) => doc.id !== documentId))

    toast({
      title: "🗑️ Documento removido",
      description: "O arquivo foi excluído permanentemente.",
      variant: "destructive",
    })
  }

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-600" />
      case "docx":
      case "doc":
        return <FileText className="h-5 w-5 text-blue-600" />
      case "xlsx":
      case "xls":
        return <FileText className="h-5 w-5 text-green-600" />
      case "mp4":
      case "avi":
      case "mov":
        return <Video className="h-5 w-5 text-purple-600" />
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <ImageIcon className="h-5 w-5 text-orange-600" />
      case "zip":
      case "rar":
        return <File className="h-5 w-5 text-gray-600" />
      default:
        return <File className="h-5 w-5 text-gray-600" />
    }
  }

  const filteredDocuments = documentList.filter((doc) => {
    if (selectedCategory === "todos") return true
    return doc.category === selectedCategory
  })

  const categories = Array.from(new Set(documents.map((doc) => doc.category)))

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Caminho 4D</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Documentos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar documentos..." className="w-[300px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Documentos</h1>
              <p className="text-muted-foreground">Gerencie arquivos e documentos da comunidade</p>
            </div>
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Enviar Documento
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Enviar Novo Documento</DialogTitle>
                  <DialogDescription>Faça upload de um arquivo para compartilhar com a comunidade.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="file">Arquivo</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.zip,.rar"
                    />
                    {uploadFile && (
                      <p className="text-sm text-muted-foreground">
                        Arquivo selecionado: {uploadFile.name} ({(uploadFile.size / 1024 / 1024).toFixed(1)} MB)
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={uploadCategory} onValueChange={setUploadCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Documentos Oficiais">Documentos Oficiais</SelectItem>
                        <SelectItem value="Formação">Formação</SelectItem>
                        <SelectItem value="Planejamento">Planejamento</SelectItem>
                        <SelectItem value="Eventos">Eventos</SelectItem>
                        <SelectItem value="Atas">Atas</SelectItem>
                        <SelectItem value="Mídia">Mídia</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleUploadSubmit}>
                      <Upload className="mr-2 h-4 w-4" />
                      Enviar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Document Statistics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Documentos</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{documentList.length}</div>
                <p className="text-xs text-muted-foreground">Arquivos disponíveis</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Downloads</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{documentList.reduce((acc, doc) => acc + doc.downloads, 0)}</div>
                <p className="text-xs text-muted-foreground">Downloads realizados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tamanho Total</CardTitle>
                <File className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {documentList
                    .reduce((acc, doc) => {
                      const size = Number.parseFloat(doc.size.split(" ")[0])
                      const unit = doc.size.split(" ")[1]
                      return acc + (unit === "MB" ? size : size / 1024)
                    }, 0)
                    .toFixed(1)}{" "}
                  MB
                </div>
                <p className="text-xs text-muted-foreground">Espaço utilizado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mais Baixado</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.max(...documentList.map((doc) => doc.downloads))}</div>
                <p className="text-xs text-muted-foreground">Downloads do arquivo mais popular</p>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-4">
            <Label>Filtrar por categoria:</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as Categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Documents Table */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Documentos</CardTitle>
              <CardDescription>Gerencie os arquivos compartilhados com a comunidade</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Arquivo</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Tamanho</TableHead>
                    <TableHead>Enviado por</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          {getFileIcon(document.type)}
                          <div>
                            <p className="font-medium">{document.name}</p>
                            <p className="text-sm text-muted-foreground">{document.type.toUpperCase()}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{document.category}</Badge>
                      </TableCell>
                      <TableCell>{document.size}</TableCell>
                      <TableCell>{document.uploadedBy}</TableCell>
                      <TableCell>{new Date(document.uploadDate).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>{document.downloads}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleDownload(document.id)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir o arquivo "{document.name}"? Esta ação não pode ser
                                  desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(document.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
