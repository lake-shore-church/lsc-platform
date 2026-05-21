import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@repo/cms";
import { FacebookFeed } from "@repo/ui/web/FacebookFeed";
import { SubscribeForm } from "@/components/forms/SubscribeForm";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/format";

const FACEBOOK_URL = "https://www.facebook.com/lschurchchicago";

export async function StayConnectedSection({ posts }: { posts: BlogPost[] }) {
  const t = await getTranslations("home");

  return (
    <section className="section-pad bg-background">
      <Container>
        <h2 className="font-display text-h2 text-brand-primary">{t("follow_daily")}</h2>
        <p className="mt-3 max-w-2xl text-base text-foreground-secondary">{t("pastor_daily")}</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <FacebookFeed />
          <div className="space-y-8">
            <div className="rounded-card border border-default bg-surface p-6">
              <h3 className="font-display text-h3 text-brand-primary">{t("subscribe_email")}</h3>
              <div className="mt-4">
                <SubscribeForm />
              </div>
              <p className="mt-6 text-sm text-foreground-secondary">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover font-semibold text-brand-primary"
                >
                  {t("facebook_followers")}
                </a>
              </p>
            </div>
            {posts.length > 0 ? (
              <div>
                <h3 className="font-display text-h3 text-brand-primary">
                  {t("recent_devotionals")}
                </h3>
                <ul className="mt-4 space-y-3">
                  {posts.map((post) => (
                    <li key={post._id}>
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="link-hover block rounded-md border border-default bg-surface px-4 py-3"
                      >
                        <span className="font-semibold text-foreground-primary">{post.title}</span>
                        {post.publishedAt ? (
                          <span className="mt-1 block text-sm text-foreground-muted">
                            {formatDate(post.publishedAt)}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
