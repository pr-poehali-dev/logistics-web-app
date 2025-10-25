import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

type ContainerStatus = 'в оперировании' | 'забронирован' | 'на продажу' | 'неисправный' | 'грязный' | 'порожний' | 'в пути' | 'под погрузку' | 'непроверенный';
type RequestType = 'прием груза' | 'выдача груза' | 'доп. услуги';

interface Container {
  id: string;
  number: string;
  status: ContainerStatus;
  location: string;
  type: string;
}

interface Request {
  id: string;
  type: RequestType;
  container: string;
  date: string;
  client: string;
  status: 'новая' | 'в работе' | 'выполнена';
}

const Index = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('все');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const containers: Container[] = [
    { id: '1', number: 'TCNU3458923', status: 'в оперировании', location: 'Гамбург', type: '40HC' },
    { id: '2', number: 'MSCU7654321', status: 'забронирован', location: 'Прием', type: '20DC' },
    { id: '3', number: 'GLDU2345678', status: 'в пути', location: 'Транзит', type: '40HC' },
    { id: '4', number: 'HLBU9876543', status: 'под погрузку', location: 'Выдача', type: '20DC' },
    { id: '5', number: 'TEMU4567890', status: 'порожний', location: 'Гамбург', type: '40HC' },
    { id: '6', number: 'CMAU1234567', status: 'грязный', location: 'Прием', type: '20DC' },
  ];

  const requests: Request[] = [
    { id: '1', type: 'прием груза', container: 'TCNU3458923', date: '2025-10-26', client: 'ООО "Транслогистика"', status: 'новая' },
    { id: '2', type: 'выдача груза', container: 'MSCU7654321', date: '2025-10-25', client: 'ИП Иванов', status: 'в работе' },
    { id: '3', type: 'доп. услуги', container: 'GLDU2345678', date: '2025-10-27', client: 'АО "ГрузТранс"', status: 'выполнена' },
  ];

  const statusColors: Record<ContainerStatus, string> = {
    'в оперировании': 'bg-blue-500',
    'забронирован': 'bg-yellow-500',
    'на продажу': 'bg-green-500',
    'неисправный': 'bg-red-500',
    'грязный': 'bg-orange-500',
    'порожний': 'bg-gray-400',
    'в пути': 'bg-purple-500',
    'под погрузку': 'bg-cyan-500',
    'непроверенный': 'bg-pink-500'
  };

  const getStatusCount = (status: ContainerStatus) => {
    return containers.filter(c => c.status === status).length;
  };

  const filteredContainers = containers.filter(c => {
    const matchesStatus = selectedStatus === 'все' || c.status === selectedStatus;
    const matchesSearch = c.number.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statuses: ContainerStatus[] = [
    'в оперировании', 'забронирован', 'на продажу', 'неисправный', 
    'грязный', 'порожний', 'в пути', 'под погрузку', 'непроверенный'
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-secondary border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Container" size={28} className="text-primary" />
              <h1 className="text-2xl font-bold text-white">LogiTrack</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white hover:text-primary">
                <Icon name="Bell" size={20} />
              </Button>
              <Button variant="ghost" className="text-white hover:text-primary">
                <Icon name="Settings" size={20} />
              </Button>
              <div className="flex items-center gap-2 pl-4 border-l border-sidebar-border">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                  А
                </div>
                <span className="text-white font-medium">Администратор</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={18} />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="containers" className="gap-2">
              <Icon name="Container" size={18} />
              Контейнеры
            </TabsTrigger>
            <TabsTrigger value="requests" className="gap-2">
              <Icon name="FileText" size={18} />
              Заявки
            </TabsTrigger>
            <TabsTrigger value="planning" className="gap-2">
              <Icon name="Calendar" size={18} />
              Планирование
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Всего контейнеров</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{containers.length}</div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                    <Icon name="TrendingUp" size={16} />
                    <span>+12% за месяц</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Активных заявок</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{requests.filter(r => r.status !== 'выполнена').length}</div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-blue-600">
                    <Icon name="Activity" size={16} />
                    <span>В обработке</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">В пути</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{getStatusCount('в пути')}</div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-purple-600">
                    <Icon name="Truck" size={16} />
                    <span>В транзите</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Загрузка</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">78%</div>
                  <Progress value={78} className="mt-3" />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PieChart" size={20} />
                    Статистика по статусам
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {statuses.map(status => {
                    const count = getStatusCount(status);
                    const percentage = (count / containers.length) * 100;
                    return (
                      <div key={status} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
                            <span className="text-sm font-medium">{status}</span>
                          </div>
                          <span className="text-sm font-bold">{count}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Clock" size={20} />
                    Последние заявки
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requests.slice(0, 3).map(request => (
                      <div key={request.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                        <div className="mt-1">
                          <Icon name="FileText" size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm">{request.type}</p>
                            <Badge variant={request.status === 'новая' ? 'default' : request.status === 'в работе' ? 'secondary' : 'outline'}>
                              {request.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{request.container}</p>
                          <p className="text-xs text-muted-foreground">{request.client}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="containers" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Container" size={24} />
                    Управление контейнерами
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Icon name="Plus" size={18} />
                        Добавить контейнер
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Новый контейнер</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label>Номер контейнера</Label>
                          <Input placeholder="TCNU3458923" />
                        </div>
                        <div className="space-y-2">
                          <Label>Тип</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тип" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="20DC">20DC</SelectItem>
                              <SelectItem value="40HC">40HC</SelectItem>
                              <SelectItem value="40RF">40RF</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Статус</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите статус" />
                            </SelectTrigger>
                            <SelectContent>
                              {statuses.map(status => (
                                <SelectItem key={status} value={status}>{status}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Местоположение</Label>
                          <Input placeholder="Гамбург" />
                        </div>
                        <Button className="w-full">Создать контейнер</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      placeholder="Поиск по номеру или местоположению..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full sm:w-[240px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="все">Все статусы</SelectItem>
                      {statuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Номер</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Местоположение</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContainers.map(container => (
                        <TableRow key={container.id} className="hover:bg-muted/50">
                          <TableCell className="font-mono font-semibold">{container.number}</TableCell>
                          <TableCell>{container.type}</TableCell>
                          <TableCell>
                            <Badge className={statusColors[container.status]}>
                              {container.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="flex items-center gap-2">
                            <Icon name="MapPin" size={16} className="text-muted-foreground" />
                            {container.location}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Icon name="Eye" size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Icon name="Edit" size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="FileText" size={24} />
                    Заявки
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Icon name="Plus" size={18} />
                        Создать заявку
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Новая заявка</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label>Тип заявки</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тип" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="прием груза">Прием груза</SelectItem>
                              <SelectItem value="выдача груза">Выдача груза</SelectItem>
                              <SelectItem value="доп. услуги">Доп. услуги</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Контейнер</Label>
                          <Input placeholder="TCNU3458923" />
                        </div>
                        <div className="space-y-2">
                          <Label>Клиент</Label>
                          <Input placeholder="ООО 'Компания'" />
                        </div>
                        <div className="space-y-2">
                          <Label>Дата</Label>
                          <Input type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label>Комментарий</Label>
                          <Textarea placeholder="Дополнительная информация..." rows={3} />
                        </div>
                        <Button className="w-full">Создать заявку</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Контейнер</TableHead>
                        <TableHead>Клиент</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests.map(request => (
                        <TableRow key={request.id} className="hover:bg-muted/50">
                          <TableCell className="font-mono">#{request.id}</TableCell>
                          <TableCell>{request.type}</TableCell>
                          <TableCell className="font-mono">{request.container}</TableCell>
                          <TableCell>{request.client}</TableCell>
                          <TableCell>{new Date(request.date).toLocaleDateString('ru-RU')}</TableCell>
                          <TableCell>
                            <Badge variant={request.status === 'новая' ? 'default' : request.status === 'в работе' ? 'secondary' : 'outline'}>
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Icon name="Eye" size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Icon name="Edit" size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planning" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" size={24} />
                  Планирование слотов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid grid-cols-7 gap-2">
                      {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map((day, idx) => (
                        <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: 35 }, (_, i) => (
                        <div
                          key={i}
                          className={`border rounded-lg p-3 min-h-[80px] hover:border-primary cursor-pointer transition-colors ${
                            i % 7 === 5 || i % 7 === 6 ? 'bg-muted/30' : 'bg-card'
                          }`}
                        >
                          <div className="text-sm font-medium mb-1">{i + 1}</div>
                          {(i === 5 || i === 12 || i === 19) && (
                            <div className="text-xs bg-primary text-white rounded px-1 py-0.5 mb-1">
                              10:00-12:00
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Дата слота</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Время начала</Label>
                      <Input type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label>Время окончания</Label>
                      <Input type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label>Контейнер</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите контейнер" />
                        </SelectTrigger>
                        <SelectContent>
                          {containers.map(c => (
                            <SelectItem key={c.id} value={c.number}>{c.number}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Тип операции</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите операцию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="loading">Погрузка</SelectItem>
                          <SelectItem value="unloading">Разгрузка</SelectItem>
                          <SelectItem value="maintenance">Обслуживание</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Забронировать слот</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
