"use client";

import { useSession } from "next-auth/react";
import { Session } from "@auth/core/types";
import { Flex, Card, Splitter } from "antd";
import useDashboardStyles from "@/assets/css/__dashboard.style";
import { ThreeDot } from "react-loading-indicators";
import { Colors } from "@/constants/colors";
import { removeFollowerAction } from "@/actions/github/github-action";

import { useDashboardData } from "@/hooks/useDashboardData";

import NetworkComponent from "@/components/molecules/Network";
import IssueCard from "@/components/molecules/IssueCard";
import { CenterMessage } from "@/components/atoms/CenterMessage";

import { motion } from "framer-motion";

export default function DashboardPage() {
  const data = useSession();
  const session: Session | null = data.data ? data.data : null;

  if (!session) {
    return (
      <CenterMessage
        title="Erro de sessão"
        description="Não foi possível carregar os dados da sessão."
      />
    );
  }

  const { mutualFollowers, nonFollowers, issues, loading } =
    useDashboardData(session);

  const { styles } = useDashboardStyles();
  if (loading)
    return (
      <Flex
        align="center"
        justify="center"
        style={{ width: "100%", height: "100%" }}
      >
        <ThreeDot
          color={Colors.DeepVioletActive}
          text="Carregando"
          variant="bob"
          textColor={Colors.DeepVioletActive}
        />
      </Flex>
    );

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ height: "100%" }}
    >
      <Flex className={styles.dashboard}>
        <Splitter className={styles.splitter}>
          <Splitter.Panel collapsible={{ start: true, end: true }}>
            <Card title="Seguidores mútuos">
              {mutualFollowers.map((element: any) => (
                <NetworkComponent
                  key={element.id}
                  data={element}
                  onRemove={() => removeFollowerAction(session, element.login)}
                  onView={() => window.open(element.html_url, "_blank")}
                />
              ))}
            </Card>
          </Splitter.Panel>

          <Splitter.Panel collapsible={{ start: true, end: true }}>
            <Card title="Não seguidores">
              {nonFollowers.map((element: any) => (
                <NetworkComponent
                  key={element.id}
                  data={element}
                  onRemove={() => removeFollowerAction(session, element.login)}
                  onView={() => window.open(element.html_url, "_blank")}
                />
              ))}
            </Card>
          </Splitter.Panel>

          <Splitter.Panel collapsible={{ start: true, end: true }}>
            <Card title="Issues recebidas">
              <Flex vertical>
                {issues.map((issue: any) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    onView={(issue) => window.open(issue.html_url, "_blank")}
                  />
                ))}
              </Flex>
            </Card>
          </Splitter.Panel>
        </Splitter>
      </Flex>
    </motion.div>
  );
}
