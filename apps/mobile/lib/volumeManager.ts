/** Volume-button slide control — dev/EAS builds only; no-op in Expo Go. */
export async function bindVolumeSlideControl(
  onStep: (delta: 1 | -1) => void,
): Promise<() => void> {
  try {
    const { VolumeManager } = await import("react-native-volume-manager");
    let lastVolume: number | null = null;

    await VolumeManager.showNativeVolumeUI({ enabled: false });
    const current = await VolumeManager.getVolume();
    lastVolume = current.volume ?? null;

    const sub = VolumeManager.addVolumeListener((result) => {
      if (lastVolume === null) {
        lastVolume = result.volume;
        return;
      }
      const delta = result.volume - lastVolume;
      lastVolume = result.volume;
      if (Math.abs(delta) < 0.001) return;
      onStep(delta > 0 ? 1 : -1);
    });

    return () => {
      sub.remove();
      void VolumeManager.showNativeVolumeUI({ enabled: true });
    };
  } catch {
    return () => {};
  }
}
