import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { uiTranslations } from '../data/content';
import { useConcreteComps } from '../context/ConcreteCompContext';
import { useAuth } from '../context/AuthContext';
import { validateImageFile } from '../lib/concreteComps';
import { ConcreteComp } from '../types';
import { formatRecordDate } from './ConcreteCompGallery';
import {
  X,
  ImagePlus,
  ImageOff,
  Loader2,
  Save,
  Pencil,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Settings2,
  Lock,
  LogIn,
  LogOut,
  ShieldCheck
} from 'lucide-react';

interface ConcreteCompAdminProps {
  open: boolean;
  onClose: () => void;
}

type Feedback = { type: 'success' | 'error'; message: string } | null;

export const ConcreteCompAdmin: React.FC<ConcreteCompAdminProps> = ({ open, onClose }) => {
  const { language } = useLanguage();
  const t = uiTranslations[language].admin;
  const tGallery = uiTranslations[language].dynamicGallery;
  const tAuth = uiTranslations[language].auth;

  const {
    session,
    user,
    loading: authLoading,
    signingIn,
    signingOut,
    signIn,
    signOut
  } = useAuth();

  const {
    items,
    loading,
    loadError,
    operation,
    isBusy,
    configured,
    createItem,
    updateItem,
    deleteItem
  } = useConcreteComps();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState<ConcreteComp | null>(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  // Sign-in form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Local object URL preview for the currently selected file.
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const resetForm = () => {
    setEditing(null);
    setTitulo('');
    setDescripcion('');
    setFile(null);
    setFormError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    if (!selected) {
      setFile(null);
      return;
    }

    const problem = validateImageFile(selected);
    if (problem) {
      setFormError(problem === 'invalid-type' ? t.invalidImage : t.imageTooLarge);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setFormError(null);
    setFile(selected);
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    if (signingIn) return;

    if (!email.trim() || !password) {
      setAuthError(tAuth.credentialsRequired);
      return;
    }

    setAuthError(null);
    try {
      await signIn(email, password);
      setPassword('');
    } catch (error) {
      console.error('[ConcreteCompAdmin] Sign-in failed', error);
      setAuthError(
        `${tAuth.signInError}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  const handleSignOut = async () => {
    if (signingOut) return;
    setAuthError(null);
    try {
      await signOut();
      resetForm();
      setFeedback(null);
      setPendingDeleteId(null);
    } catch (error) {
      console.error('[ConcreteCompAdmin] Sign-out failed', error);
      setAuthError(error instanceof Error ? error.message : String(error));
    }
  };

  const handleStartEdit = (item: ConcreteComp) => {
    setEditing(item);
    setTitulo(item.titulo);
    setDescripcion(item.descripcion ?? '');
    setFile(null);
    setFormError(null);
    setFeedback(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isBusy) return;

    if (!titulo.trim()) {
      setFormError(t.titleRequired);
      return;
    }

    setFormError(null);
    setFeedback(null);

    try {
      if (editing) {
        await updateItem(editing, { titulo, descripcion, file });
        setFeedback({ type: 'success', message: t.updatedOk });
      } else {
        await createItem({ titulo, descripcion, file });
        setFeedback({ type: 'success', message: t.createdOk });
      }
      resetForm();
    } catch (error) {
      console.error('[ConcreteCompAdmin] Save operation failed', error);
      setFeedback({
        type: 'error',
        message: `${t.errorPrefix}: ${error instanceof Error ? error.message : String(error)}`
      });
    }
  };

  const handleDelete = async (item: ConcreteComp) => {
    if (isBusy) return;
    setFeedback(null);

    try {
      await deleteItem(item);
      setPendingDeleteId(null);
      if (editing?.id === item.id) resetForm();
      setFeedback({ type: 'success', message: t.deletedOk });
    } catch (error) {
      console.error('[ConcreteCompAdmin] Delete operation failed', error);
      setFeedback({
        type: 'error',
        message: `${t.errorPrefix}: ${error instanceof Error ? error.message : String(error)}`
      });
    }
  };

  if (!open) return null;

  const busyLabel =
    operation === 'uploading'
      ? t.uploading
      : operation === 'creating'
        ? t.saving
        : operation === 'updating'
          ? t.updating
          : operation === 'deleting'
            ? t.deleting
            : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">

        {/* Modal Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Settings2 className="w-4 h-4" />
            <span>{t.title}</span>
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">

          {/* Missing configuration warning */}
          {!configured && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p className="text-red-700 text-xs leading-relaxed">{tGallery.notConfigured}</p>
            </div>
          )}

          {/* Restoring the stored session */}
          {authLoading && (
            <p className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 py-8">
              <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
              <span>{tAuth.checkingSession}</span>
            </p>
          )}

          {/* Sign-in gate */}
          {!authLoading && !session && (
            <form onSubmit={handleSignIn} className="max-w-sm mx-auto py-4 space-y-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center mx-auto border border-slate-700">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="font-black text-slate-900 text-lg">{tAuth.signInTitle}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{tAuth.signInSubtitle}</p>
              </div>

              <div>
                <label htmlFor="cc-email" className="block text-xs font-bold text-slate-700 mb-1">
                  {tAuth.email}
                </label>
                <input
                  id="cc-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={signingIn || !configured}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-lg p-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:bg-slate-100 disabled:text-slate-400"
                  placeholder={tAuth.emailPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="cc-password" className="block text-xs font-bold text-slate-700 mb-1">
                  {tAuth.password}
                </label>
                <input
                  id="cc-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={signingIn || !configured}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-lg p-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:bg-slate-100 disabled:text-slate-400"
                  placeholder={tAuth.passwordPlaceholder}
                />
              </div>

              {authError && (
                <p className="flex items-start gap-2 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span className="break-words">{authError}</span>
                </p>
              )}

              <button
                type="submit"
                disabled={signingIn || !configured}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs shadow disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {signingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                <span>{signingIn ? tAuth.signingIn : tAuth.signIn}</span>
              </button>

              <p className="text-slate-400 text-[11px] text-center leading-relaxed">
                {tAuth.restrictedNotice}
              </p>
            </form>
          )}

          {!authLoading && session && (
            <>

          {/* Signed-in session bar */}
          <div className="bg-slate-900 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-xs text-slate-300 min-w-0">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">
                {tAuth.signedInAs} <strong className="text-white">{user?.email}</strong>
              </span>
            </span>
            <button
              onClick={() => void handleSignOut()}
              disabled={signingOut || isBusy}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg border border-slate-700 disabled:opacity-60 transition-colors shrink-0"
            >
              {signingOut ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5 text-amber-400" />}
              <span>{signingOut ? tAuth.signingOut : tAuth.signOut}</span>
            </button>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">{t.subtitle}</p>

          {/* Operation feedback */}
          {feedback && (
            <div
              className={`rounded-xl p-4 flex items-start gap-3 border ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <p
                className={`text-xs leading-relaxed break-words ${
                  feedback.type === 'success' ? 'text-emerald-700' : 'text-red-700'
                }`}
              >
                {feedback.message}
              </p>
            </div>
          )}

          {/* Create / Edit Form */}
          <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              {editing ? <Pencil className="w-4 h-4 text-amber-600" /> : <ImagePlus className="w-4 h-4 text-amber-600" />}
              <span>{editing ? `${t.editRecord}: #${editing.id}` : t.newRecord}</span>
            </h4>

            <div>
              <label htmlFor="cc-titulo" className="block text-xs font-bold text-slate-700 mb-1">
                {t.fieldTitle} *
              </label>
              <input
                id="cc-titulo"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                disabled={isBusy || !configured}
                className="w-full bg-white border border-slate-300 text-slate-900 rounded-lg p-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:bg-slate-100 disabled:text-slate-400"
                placeholder={t.fieldTitlePlaceholder}
              />
            </div>

            <div>
              <label htmlFor="cc-descripcion" className="block text-xs font-bold text-slate-700 mb-1">
                {t.fieldDescription}
              </label>
              <textarea
                id="cc-descripcion"
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                disabled={isBusy || !configured}
                className="w-full bg-white border border-slate-300 text-slate-900 rounded-lg p-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:bg-slate-100 disabled:text-slate-400"
                placeholder={t.fieldDescriptionPlaceholder}
              />
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-bold text-slate-700">{t.fieldImage}</span>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative h-24 w-full sm:w-32 shrink-0 rounded-lg overflow-hidden bg-slate-900 border border-slate-300">
                  {previewUrl || editing?.imagen_url ? (
                    <img
                      src={previewUrl ?? (editing?.imagen_url as string)}
                      alt={titulo || t.fieldImage}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <ImageOff className="w-5 h-5" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleSelectFile}
                    disabled={isBusy || !configured}
                    className="block w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:cursor-pointer disabled:opacity-50"
                  />
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    {t.imageHint} {editing ? t.keepCurrentImage : ''}
                  </p>
                  {file && (
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      disabled={isBusy}
                      className="text-[11px] font-bold text-slate-700 hover:text-amber-600 transition-colors disabled:opacity-50"
                    >
                      {t.clearSelection}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Client-side validation message */}
            {formError && (
              <p className="flex items-center gap-2 text-xs font-semibold text-red-700">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{formError}</span>
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={isBusy || !configured}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs shadow disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {isBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{busyLabel ?? (editing ? t.update : t.save)}</span>
              </button>

              {editing && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isBusy}
                  className="w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-60 transition-colors"
                >
                  {t.cancel}
                </button>
              )}
            </div>
          </form>

          {/* Records list */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">{tGallery.title}</h4>
              <span className="text-xs font-semibold text-slate-500">
                {items.length} {t.recordsCount}
              </span>
            </div>

            {loading && (
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                <span>{tGallery.loading}</span>
              </p>
            )}

            {!loading && loadError && (
              <p className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700 break-words">
                {configured ? loadError : tGallery.notConfigured}
              </p>
            )}

            {!loading && !loadError && items.length === 0 && (
              <p className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-6 text-center text-xs text-slate-500">
                {t.listEmpty}
              </p>
            )}

            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center gap-3 shadow-sm"
              >
                <div className="relative h-20 w-full sm:w-24 shrink-0 rounded-lg overflow-hidden bg-slate-900 border border-slate-200">
                  {item.imagen_url ? (
                    <img
                      src={item.imagen_url}
                      alt={item.titulo}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <ImageOff className="w-5 h-5" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <p className="font-bold text-slate-900 text-sm leading-snug break-words">{item.titulo}</p>
                  {item.descripcion && (
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{item.descripcion}</p>
                  )}
                  <p className="text-slate-400 text-[11px] font-medium">
                    {tGallery.publishedOn} {formatRecordDate(item.fecha_creacion, language)}
                  </p>
                </div>

                {pendingDeleteId === item.id ? (
                  <div className="w-full sm:w-56 shrink-0 bg-red-50 border border-red-200 rounded-lg p-3 space-y-2">
                    <p className="text-xs font-bold text-slate-900">{t.confirmDeleteTitle}</p>
                    <p className="text-[11px] text-red-700 leading-relaxed">{t.confirmDeleteBody}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => void handleDelete(item)}
                        disabled={isBusy}
                        className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg disabled:opacity-60 transition-colors"
                      >
                        {operation === 'deleting' ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Trash2 className="w-3 h-3" />
                        )}
                        <span>{operation === 'deleting' ? t.deleting : t.confirmDelete}</span>
                      </button>
                      <button
                        onClick={() => setPendingDeleteId(null)}
                        disabled={isBusy}
                        className="text-[11px] font-bold text-slate-700 hover:text-slate-900 px-2 py-1.5 disabled:opacity-60"
                      >
                        {t.keepRecord}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex sm:flex-col items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleStartEdit(item)}
                      disabled={isBusy}
                      className="w-full flex items-center justify-center gap-1.5 border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold text-[11px] px-3 py-1.5 rounded-lg disabled:opacity-60 transition-colors"
                    >
                      <Pencil className="w-3 h-3 text-amber-600" />
                      <span>{t.edit}</span>
                    </button>
                    <button
                      onClick={() => {
                        setFeedback(null);
                        setPendingDeleteId(item.id);
                      }}
                      disabled={isBusy}
                      className="w-full flex items-center justify-center gap-1.5 border border-slate-300 hover:border-red-300 hover:bg-red-50 text-slate-800 font-semibold text-[11px] px-3 py-1.5 rounded-lg disabled:opacity-60 transition-colors"
                    >
                      <Trash2 className="w-3 h-3 text-red-600" />
                      <span>{t.delete}</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

            </>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
};
