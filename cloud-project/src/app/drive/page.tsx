import {
  Bell,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileArchive,
  FileImage,
  FileText,
  Folder,
  HardDrive,
  LayoutGrid,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Share2,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/src/shared/ui/button";
import { Card } from "@/src/shared/ui/card";

const folders = [
  { name: "Документы", count: "12 файлов", color: "bg-[#f2eafb] text-[#7141a3]", updated: "Сегодня" },
  { name: "Дизайн-проект", count: "8 файлов", color: "bg-[#fcefe7] text-[#cf7041]", updated: "Вчера" },
  { name: "Фотографии", count: "24 файла", color: "bg-[#eaf2fb] text-[#4978ae]", updated: "18 окт. 2026" },
  { name: "Работа", count: "6 файлов", color: "bg-[#eaf5ee] text-[#4b8a60]", updated: "15 окт. 2026" },
];

const files = [
  { name: "Техническое задание.pdf", type: "PDF-документ", size: "2,4 МБ", date: "Сегодня, 10:42", icon: FileText, color: "text-[#cb5b58] bg-[#fff0ef]" },
  { name: "Презентация проекта.pptx", type: "Презентация", size: "8,1 МБ", date: "Сегодня, 09:18", icon: FileImage, color: "text-[#d8883d] bg-[#fff5e9]" },
  { name: "Бюджет на 2026.xlsx", type: "Таблица Excel", size: "1,2 МБ", date: "Вчера, 16:05", icon: FileText, color: "text-[#38845e] bg-[#eaf6ef]" },
  { name: "Архив материалов.zip", type: "ZIP-архив", size: "34,6 МБ", date: "17 окт. 2026", icon: FileArchive, color: "text-[#6b63a7] bg-[#f0effa]" },
  { name: "Обложка проекта.png", type: "Изображение PNG", size: "4,8 МБ", date: "15 окт. 2026", icon: FileImage, color: "text-[#4c80b6] bg-[#edf4fb]" },
];

export default function DrivePage() {
  return (
    <main className="min-h-screen bg-[#f7f6f9] text-[#211b2d]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[248px] shrink-0 border-r border-[#e9e6ed] bg-white px-5 py-7 lg:flex lg:flex-col">
          <a href="/drive" className="mb-10 flex items-center gap-3 px-2 text-lg font-semibold tracking-wide">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#302141] text-white"><HardDrive className="size-5" /></span>
            cloud
          </a>
          <Button className="mb-8 h-11 justify-start rounded-xl bg-[#302141] px-4 shadow-[0_6px_16px_-8px_rgba(48,33,65,0.7)] hover:bg-[#493365]"><Plus className="size-4" /> Создать</Button>
          <nav aria-label="Основная навигация" className="space-y-1">
            <a href="/drive" className="flex items-center gap-3 rounded-xl bg-[#f1eef4] px-3 py-2.5 text-sm font-medium text-[#302141]"><HardDrive className="size-4" /> Мой диск</a>
            <a href="#recent" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#77717f] hover:bg-[#f7f6f9]"><ClockIcon /> Недавние</a>
            <a href="#starred" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#77717f] hover:bg-[#f7f6f9]"><Star className="size-4" /> Избранное</a>
            <a href="#shared" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#77717f] hover:bg-[#f7f6f9]"><Share2 className="size-4" /> Доступные мне</a>
            <a href="#trash" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#77717f] hover:bg-[#f7f6f9]"><Trash2 className="size-4" /> Корзина</a>
          </nav>
          <div className="mt-auto">
            <div className="mb-3 flex items-center justify-between text-xs text-[#77717f]"><span>Хранилище</span><span>6,4 из 15 ГБ</span></div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#eeeaf2]"><div className="h-full w-[43%] rounded-full bg-[#493365]" /></div>
            <p className="mt-2 text-xs text-[#99939f]">Использовано 43%</p>
            <a href="#settings" className="mt-8 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#77717f]"><Settings2 className="size-4" /> Настройки</a>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex h-[76px] items-center justify-between border-b border-[#e9e6ed] bg-white px-5 sm:px-8 lg:px-10">
            <div className="flex w-full max-w-xl items-center gap-3 rounded-xl bg-[#f7f6f9] px-4 py-2.5 text-sm text-[#99939f] sm:ml-0"><Search className="size-4" /><span>Поиск на диске</span><kbd className="ml-auto hidden rounded border border-[#e4e1e9] bg-white px-1.5 py-0.5 text-[10px] sm:block">⌘ K</kbd></div>
            <div className="ml-4 flex shrink-0 items-center gap-3 sm:gap-5"><Button variant="ghost" size="icon" aria-label="Уведомления" className="rounded-full text-[#77717f]"><Bell className="size-[18px]" /></Button><div className="flex items-center gap-2"><div className="flex size-9 items-center justify-center rounded-full bg-[#eee8f5] text-sm font-semibold text-[#493365]">А</div><span className="hidden text-sm font-medium sm:block">Арина</span><ChevronDown className="hidden size-4 text-[#99939f] sm:block" /></div></div>
          </header>

          <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div><div className="mb-3 flex items-center gap-2 text-sm text-[#99939f]"><span>Мой диск</span><ChevronRight className="size-3.5" /><span className="font-medium text-[#493365]">Главная</span></div><h1 className="text-3xl font-semibold tracking-[-0.04em]">Мой диск</h1><p className="mt-2 text-sm text-[#77717f]">Ваши файлы и папки в одном месте</p></div>
              <div className="flex gap-2"><Button variant="outline" className="h-10 rounded-xl border-[#e4e1e9] bg-white px-4"><Upload className="size-4" /> Upload</Button><Button className="h-10 rounded-xl bg-[#302141] px-4 hover:bg-[#493365]"><Plus className="size-4" /> New Folder</Button></div>
            </div>

            <section aria-labelledby="folders-heading" className="mb-9">
              <div className="mb-4 flex items-center justify-between"><h2 id="folders-heading" className="text-base font-semibold">Папки</h2><Button variant="ghost" size="sm" className="text-[#77717f]">Все папки <ChevronRight className="size-4" /></Button></div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{folders.map((folder) => <Card key={folder.name} className="group flex-row items-center gap-3 rounded-2xl border-[#ebe8ef] bg-white p-4 shadow-none transition hover:border-[#d8cde5] hover:shadow-[0_8px_24px_-18px_rgba(48,33,65,0.35)]"><div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${folder.color}`}><Folder className="size-5" /></div><div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold">{folder.name}</div><div className="mt-1 text-xs text-[#99939f]">{folder.count} · {folder.updated}</div></div><Button variant="ghost" size="icon-sm" aria-label={`Действия для папки ${folder.name}`} className="text-[#99939f] opacity-0 group-hover:opacity-100"><MoreHorizontal className="size-4" /></Button></Card>)}</div>
            </section>

            <section aria-labelledby="files-heading">
              <div className="mb-4 flex items-center justify-between"><div><h2 id="files-heading" className="text-base font-semibold">Файлы</h2><p className="mt-1 text-xs text-[#99939f]">Последние добавленные файлы</p></div><div className="flex items-center gap-1 rounded-lg border border-[#e9e6ed] bg-white p-1"><Button variant="ghost" size="icon-sm" aria-label="Список" className="bg-[#f1eef4] text-[#493365]"><List className="size-4" /></Button><Button variant="ghost" size="icon-sm" aria-label="Сетка" className="text-[#99939f]"><LayoutGrid className="size-4" /></Button></div></div>
              <Card className="overflow-hidden rounded-2xl border-[#ebe8ef] bg-white py-0 shadow-none">
                <div className="overflow-x-auto"><table className="w-full min-w-[720px] border-collapse text-left"><thead><tr className="border-b border-[#eeeaf2] text-xs font-medium text-[#99939f]"><th className="px-5 py-3.5 font-medium">Название</th><th className="px-4 py-3.5 font-medium">Размер</th><th className="px-4 py-3.5 font-medium">Дата загрузки</th><th className="px-4 py-3.5 font-medium">Тип</th><th className="w-12 px-4 py-3.5" /></tr></thead><tbody>{files.map((file) => { const Icon = file.icon; return <tr key={file.name} className="group border-b border-[#f0edf2] last:border-0 hover:bg-[#fcfbfd]"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${file.color}`}><Icon className="size-5" /></span><div><div className="text-sm font-medium">{file.name}</div><div className="mt-1 text-xs text-[#99939f]">{file.type}</div></div></div></td><td className="px-4 py-4 text-sm text-[#77717f]">{file.size}</td><td className="px-4 py-4 text-sm text-[#77717f]">{file.date}</td><td className="px-4 py-4"><span className="rounded-full bg-[#f7f6f9] px-2.5 py-1 text-xs text-[#77717f]">{file.type.split(" ")[0]}</span></td><td className="px-4 py-4"><Button variant="ghost" size="icon-sm" aria-label={`Действия для файла ${file.name}`} className="text-[#99939f] opacity-100 sm:opacity-0 sm:group-hover:opacity-100"><MoreHorizontal className="size-4" /></Button></td></tr>; })}</tbody></table></div>
                <div className="flex items-center justify-between border-t border-[#eeeaf2] px-5 py-3 text-xs text-[#99939f]"><span>Показано 5 из 50 файлов</span><Button variant="ghost" size="sm" className="h-8 text-[#493365]">Показать ещё <ChevronDown className="size-3.5" /></Button></div>
              </Card>
            </section>
            <footer className="mt-8 flex items-center justify-between text-xs text-[#aaa4af]"><span>Обновлено только что</span><span className="hidden sm:block">© 2026 Cloud</span></footer>
          </div>
        </section>
      </div>
    </main>
  );
}

function ClockIcon() {
  return <Clock3 className="size-4" />;
}
