import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View } from "react-native";

type Props = {
  uri: string;
  height: number;
};

/** Native HLS player for Mux / in-house live and VOD (.m3u8). */
export function HlsVideoPlayer({ uri, height }: Props) {
  const player = useVideoPlayer(uri, (p) => {
    p.loop = false;
    p.play();
  });

  return (
    <View style={[styles.wrap, { height }]}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  video: { flex: 1, width: "100%" },
});
