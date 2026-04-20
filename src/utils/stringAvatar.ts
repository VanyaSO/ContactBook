const AVATAR_COLORS = [
    { bg: "#faeed9", text: "#a36a00" },
    { bg: "#e1f5ee", text: "#1f7a63" },
    { bg: "#eeedfe", text: "#4b4bb7" },
    { bg: "#e5f1fb", text: "#2b6aa3" },

    { bg: "#fde2e4", text: "#b23a48" },
    { bg: "#e2f0cb", text: "#4f772d" },
    { bg: "#f1e3f3", text: "#7b2cbf" },
    { bg: "#e0fbfc", text: "#0077b6" },

    { bg: "#fff1e6", text: "#bc6c25" },
    { bg: "#e6f4f1", text: "#2a9d8f" },
    { bg: "#f3e8ff", text: "#6d28d9" },
    { bg: "#edf6ff", text: "#1d4ed8" },
];

const stringToColor = (string: string) => {
    let hash = 0;

    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
};

export const stringAvatar = (name: string) => {
    const { bg, text } = stringToColor(name);

    const [first, second] = name.split(" ");

    return {
        sx: {
            bgcolor: bg,
            color: text,
        },
        children: `${first?.[0] ?? ""}${second?.[0] ?? ""}`,
    };
};