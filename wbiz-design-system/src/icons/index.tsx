// The wBiz icon set: Lucide (lucide-react), the set used by the current product screens, at a 1.75
// stroke. Icons fill their container, so size them with a wrapper (e.g. `size-icon`). Import icons from
// here, never from lucide-react directly, so the set and stroke stay consistent.
import type { SVGProps } from 'react';
import {
  Activity, ArrowDown, ArrowDownRight, ArrowLeftRight, ArrowUpRight, Award, Ban, Banknote, Bell, BookOpen, Boxes, BriefcaseBusiness, Building2, Calculator, Calendar, ChartColumn, ChartLine, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleCheck, CircleHelp, CircleMinus, CirclePlus, CircleUserRound, CircleX, ClipboardCheck, ClipboardList, Clock, CloudDownload, CloudUpload, Coins, Columns3, Copy, DollarSign, EllipsisVertical, Eye, FileChartColumn, FileInput, FileText, FileUp, FolderOpen, FolderPlus, Funnel, Gift, Globe, GraduationCap, Grid3x3, HandCoins, House, KeyRound, Landmark, Layers, LayoutGrid, List, ListFilter, ListTodo, MessageCircle, Moon, Package, PenLine, Plus, Printer, ReceiptText, RefreshCw, ScanBarcode, Search, Settings, ShieldCheck, ShoppingBag, ShoppingCart, SlidersHorizontal, Smartphone, Sparkles, SquarePen, Sun, Tag, Target, Trash2, TrendingDown, TrendingUp, UserCheck, UserLock, Users, Wallet, X,
  Bold, Italic, Underline, ListOrdered, Paperclip, Send, Save, File, Upload, Percent, CopyPlus, Download,
  Info, TriangleAlert, CircleAlert,
  type LucideIcon,
} from 'lucide-react';

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'ref'>;

const wrap = (Icon: LucideIcon) => {
  const Wrapped = (props: IconProps) => <Icon size="100%" strokeWidth={1.75} aria-hidden focusable="false" {...props} />;
  Wrapped.displayName = `${Icon.displayName ?? 'Icon'}Icon`;
  return Wrapped;
};

export const PlusIcon = wrap(Plus);
export const AddCircleIcon = wrap(CirclePlus);
export const MinusCircleIcon = wrap(CircleMinus);
export const CloseIcon = wrap(X);
export const CloseCircleIcon = wrap(CircleX);
export const CheckIcon = wrap(Check);
export const TickCircleIcon = wrap(CircleCheck);
export const TrashIcon = wrap(Trash2);
export const CopyIcon = wrap(Copy);
export const ImportIcon = wrap(FileInput);
export const FolderAddIcon = wrap(FolderPlus);
export const ChevronDownIcon = wrap(ChevronDown);
export const ChevronUpIcon = wrap(ChevronUp);
export const ChevronLeftIcon = wrap(ChevronLeft);
export const ChevronRightIcon = wrap(ChevronRight);
export const ArrowDownIcon = wrap(ArrowDown);
export const SearchIcon = wrap(Search);
export const CalendarIcon = wrap(Calendar);
export const FilterIcon = wrap(Funnel);
export const ListIcon = wrap(List);
export const GridIcon = wrap(LayoutGrid);
export const BellIcon = wrap(Bell);
export const MoonIcon = wrap(Moon);
export const SunIcon = wrap(Sun);
export const SparkleIcon = wrap(Sparkles);
export const AppsIcon = wrap(Grid3x3);
export const CalculatorIcon = wrap(Calculator);
export const CartIcon = wrap(ShoppingCart);
export const BagIcon = wrap(ShoppingBag);
export const ClipboardCheckIcon = wrap(ClipboardCheck);
export const BoxIcon = wrap(Package);
export const UserLockIcon = wrap(UserLock);
export const BookIcon = wrap(BookOpen);
export const TransferIcon = wrap(ArrowLeftRight);
export const LayersIcon = wrap(Layers);
export const BarChartIcon = wrap(ChartColumn);
export const BriefcaseIcon = wrap(BriefcaseBusiness);
export const TagIcon = wrap(Tag);
export const PrinterIcon = wrap(Printer);
export const FilterLinesIcon = wrap(ListFilter);
export const ColumnsIcon = wrap(Columns3);
export const MoreVerticalIcon = wrap(EllipsisVertical);
export const ExportIcon = wrap(CloudUpload);
export const CloudDownloadIcon = wrap(CloudDownload);
export const BulkUploadIcon = wrap(FileUp);
export const SettingIcon = wrap(Settings);
export const SortArrowIcon = wrap(ArrowDown);
export const EyeIcon = wrap(Eye);
export const EditIcon = wrap(SquarePen);
export const PenIcon = wrap(PenLine);
export const BlockIcon = wrap(Ban);
export const ReceiptIcon = wrap(ReceiptText);
export const MoneyReceiveIcon = wrap(HandCoins);
export const UsersIcon = wrap(Users);
export const BankIcon = wrap(Landmark);
export const SlidersIcon = wrap(SlidersHorizontal);
export const ChartIcon = wrap(ChartLine);
export const DocumentIcon = wrap(FileText);
export const HelpIcon = wrap(CircleHelp);
export const ChatIcon = wrap(MessageCircle);
export const ProfileIcon = wrap(CircleUserRound);
export const TaskIcon = wrap(ListTodo);
export const GlobeIcon = wrap(Globe);
export const WalletIcon = wrap(Wallet);
export const ClockIcon = wrap(Clock);
export const AwardIcon = wrap(Award);
export const TrainingIcon = wrap(GraduationCap);
export const KeyIcon = wrap(KeyRound);
export const ShieldIcon = wrap(ShieldCheck);
export const CoinIcon = wrap(Coins);
export const ScanIcon = wrap(ScanBarcode);
export const ActivityIcon = wrap(Activity);
export const DeviceIcon = wrap(Smartphone);
export const FolderIcon = wrap(FolderOpen);
export const HomeIcon = wrap(House);
export const DollarIcon = wrap(DollarSign);
export const TargetIcon = wrap(Target);
export const GiftIcon = wrap(Gift);
export const TrendUpIcon = wrap(TrendingUp);
export const TrendDownIcon = wrap(TrendingDown);
export const UserCheckIcon = wrap(UserCheck);
export const ClipboardListIcon = wrap(ClipboardList);
export const BanknoteIcon = wrap(Banknote);
export const FileChartIcon = wrap(FileChartColumn);
export const BuildingIcon = wrap(Building2);
export const BoxesIcon = wrap(Boxes);
export const ArrowDownRightIcon = wrap(ArrowDownRight);
export const ArrowUpRightIcon = wrap(ArrowUpRight);
export const RefreshIcon = wrap(RefreshCw);
export const BoldIcon = wrap(Bold);
export const ItalicIcon = wrap(Italic);
export const UnderlineIcon = wrap(Underline);
export const ListOrderedIcon = wrap(ListOrdered);
export const PaperclipIcon = wrap(Paperclip);
export const SendIcon = wrap(Send);
export const SaveIcon = wrap(Save);
export const FileIcon = wrap(File);
export const UploadIcon = wrap(Upload);
export const PercentIcon = wrap(Percent);
export const CopyPlusIcon = wrap(CopyPlus);
export const DownloadIcon = wrap(Download);
export const InfoIcon = wrap(Info);
export const WarningIcon = wrap(TriangleAlert);
export const ErrorIcon = wrap(CircleAlert);

const Base = ({ children, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false" {...props}>
    {children}
  </svg>
);
const icon = (paths: JSX.Element) => (props: IconProps) => <Base {...props}>{paths}</Base>;
/** Funnel with a pen for "More Filters" (General ledger filter, Figma). Kept from Figma because Lucide has no match. */
export const FilterEditIcon = icon(<><path d="M12.98 20.43 12 21.07c-1.33.82-3.18-.1-3.18-1.74v-5.25c0-.7-.4-1.6-.8-2.1L4.24 8.04c-.5-.5-.9-1.4-.9-2V3.73c0-1.2.9-2.1 2-2.1h13.33c1.1 0 2 .9 2 2v2.2c0 .8-.5 1.8-1 2.3" /><path d="m18.09 13.17-3.54 3.54c-.14.14-.27.4-.3.59l-.19 1.35c-.07.49.27.83.76.76l1.35-.19c.19-.03.46-.16.59-.3l3.54-3.54c.61-.61.9-1.32 0-2.22-.89-.89-1.6-.6-2.21.01ZM17.58 13.68c.3 1.08 1.14 1.92 2.22 2.22" /></>);
