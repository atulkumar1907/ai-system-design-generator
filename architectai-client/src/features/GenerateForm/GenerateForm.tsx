import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Hexagon, ChevronLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionTitle } from "./components/SectionTitle/SectionTitle";
import { ToggleCard } from "./components/ToggleCard/ToggleCard";
import "./GenerateForm.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// ─── Constants ────────────────────────────────────────────────────────────────

const ARCHITECTURE_OPTIONS = [
  "Microservices",
  "Monolith",
  "Serverless",
  "Event-driven",
] as const;

const SCALE_OPTIONS = [
  { value: "low",        label: "Low (<10k users)" },
  { value: "medium",     label: "Medium (10k-1M users)" },
  { value: "high",       label: "High (1M-100M users)" },
  { value: "hyperscale", label: "Hyper-scale (100M+)" },
] as const;

const SPECIAL_REQUIREMENTS_OPTIONS = [
  "Authentication / Auth",
  "Real-time (WebSocket)",
  "Caching layer",
  "CDN / Media delivery",
  "Message queue",
  "Search engine",
  "ML / Recommendation",
  "Geo-distribution",
  "CI/CD pipeline",
] as const;

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const generateFormSchema = z.object({
  description: z
    .string()
    .min(1, "System description is required")
    .min(10, "Description must be at least 10 characters"),

  architecturePatterns: z
    .array(z.enum(ARCHITECTURE_OPTIONS))
    .min(1, "Select at least one architecture pattern"),

  scale: z.string().default("medium"),

  specialRequirements: z
    .array(z.enum(SPECIAL_REQUIREMENTS_OPTIONS))
    .optional()
    .default([]),

  dbPreference: z.string().default("no-preference"),

  cloudProvider: z.string().default("aws"),

  notes: z.string().optional(),
});

type GenerateFormValues = z.output<typeof generateFormSchema>;

// ─── Sub-data ─────────────────────────────────────────────────────────────────

const architectureOptions: {
  title: (typeof ARCHITECTURE_OPTIONS)[number];
  desc: string;
}[] = [
  { title: "Microservices", desc: "Independent deployable services" },
  { title: "Monolith",      desc: "Single deployable unit" },
  { title: "Serverless",    desc: "Function-as-a-service" },
  { title: "Event-driven",  desc: "Async message passing" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const GenerateForm = () => {
  const form = useForm<GenerateFormValues, unknown, GenerateFormValues>({
    resolver: zodResolver(generateFormSchema) as any,
    defaultValues: {
      description: "",
      architecturePatterns: [],
      scale: "",
      specialRequirements:[] as (typeof SPECIAL_REQUIREMENTS_OPTIONS)[number][],
      dbPreference: "no-preference",
      cloudProvider: "aws",
      notes: "",
    },
  });

  const onSubmit = (values: GenerateFormValues) => {
    const payload = {
      prompt: values.description,
      architectureTypes: values.architecturePatterns.map((p) => p.toLowerCase()),
      scale: values.scale,
      specialRequirements: values.specialRequirements,
      dbPreference: values.dbPreference,
      cloudProvider: values.cloudProvider,
      constraints: values.notes ?? "",
    };
    console.log("🚀 Payload for /api/v1/generate:", payload);
  };

  return (
    <div className="generate-container">
      <button className="back-btn" onClick={() => window.history.back()}>
        <ChevronLeft size={16} /> Back to home
      </button>

      <header className="form-header">
        <h1 className="title">Generate architecture</h1>
        <p className="subtitle">
          Fill in the details below. We'll generate selected patterns and compare
          them side by side with interactive diagrams.
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="form-sections-wrapper">

            {/* ── System Description ── */}
            <div className="form-group">
              <SectionTitle title="System Description *" />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="notes-textarea resize-none"
                        placeholder="e.g. Design a scalable video streaming platform like YouTube..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Architecture Patterns ── */}
            <div className="form-group">
              <SectionTitle title="Architecture patterns to generate" />
              <FormField
                control={form.control}
                name="architecturePatterns"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="card-grid">
                        {architectureOptions.map((item) => {
                          const isActive = field.value.includes(item.title);
                          const toggle = () => {
                            const next = isActive
                              ? field.value.filter((v) => v !== item.title)
                              : [...field.value, item.title];
                            field.onChange(next);
                          };
                          return (
                            <ToggleCard
                              key={item.title}
                              title={item.title}
                              description={item.desc}
                              active={isActive}
                              onClick={toggle}
                            />
                          );
                        })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Scale Requirements ── */}
            <div className="form-group">
              <SectionTitle title="Scale Requirements" />
              <FormField
                control={form.control}
                name="scale"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="scale-options">
                        {SCALE_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            className={`scale-pill ${field.value === option.value ? "scale-pill--active" : ""}`}
                            onClick={() => field.onChange(option.value)}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Special Requirements ── */}
            <div className="form-group">
              <SectionTitle title="Special Requirements" />
              <FormField
                control={form.control}
                name="specialRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="pills-wrap">
                        {SPECIAL_REQUIREMENTS_OPTIONS.map((req) => {
                          const isActive = field.value.includes(req);
                          const toggle = () => {
                            const next = isActive
                              ? field.value.filter((v) => v !== req)
                              : [...field.value, req];
                            field.onChange(next);
                          };
                          return (
                            <button
                              key={req}
                              type="button"
                              className={`req-pill ${isActive ? "req-pill--active" : ""}`}
                              onClick={toggle}
                            >
                              {req}
                            </button>
                          );
                        })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Additional Context ── */}
            <div className="form-group">
              <SectionTitle title="ADDITIONAL CONTEXT (OPTIONAL)" />
              <div className="form-row">

                {/* DB Preference */}
                <div className="form-field">
                  <FormField
                    control={form.control}
                    name="dbPreference"
                    render={({ field }) => (
                      <FormItem>
                        <label className="field-label">PRIMARY DATABASE PREFERENCE</label>
                        <Select modal={false} value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="form-select-trigger">
                              <SelectValue placeholder="No preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent position="popper" className="select-dropdown-content">
                            <SelectItem value="no-preference" className="select-item">No preference</SelectItem>
                            <SelectItem value="postgresql"    className="select-item">SQL (PostgreSQL, MySQL)</SelectItem>
                            <SelectItem value="mongodb"       className="select-item">NoSQL (MongoDB, Cassandra)</SelectItem>
                            <SelectItem value="dynamodb"      className="select-item">DynamoDB</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Cloud Provider */}
                <div className="form-field">
                  <FormField
                    control={form.control}
                    name="cloudProvider"
                    render={({ field }) => (
                      <FormItem>
                        <label className="field-label">CLOUD PROVIDER</label>
                        <Select modal={false} value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="form-select-trigger">
                              <SelectValue placeholder="Cloud agnostic" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent position="popper" className="select-dropdown-content">
                            <SelectItem value="cloud-agnostic" className="select-item">Cloud agnostic</SelectItem>
                            <SelectItem value="aws"            className="select-item">AWS</SelectItem>
                            <SelectItem value="gcp"            className="select-item">GCP</SelectItem>
                            <SelectItem value="azure"          className="select-item">Azure</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

              </div>
            </div>

            {/* ── Notes ── */}
            <div className="form-group">
              <SectionTitle title="CONSTRAINTS OR NOTES (OPTIONAL)" />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="notes-textarea resize-none"
                        placeholder="e.g. Must support offline mode, HIPAA compliant..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          </div>

          {/* ── Footer Actions ── */}
          <div className="actions-footer">
            <Button type="submit" className="btn-primary-glow">
              <Hexagon size={16} className="mr-2" />
              Generate all architectures
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="btn-secondary-dark"
              onClick={() => window.location.reload()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};