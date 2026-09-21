import json

# Generates 100 flashcards for CCNA-D4, 100 for CCNA-D5, and 100 for CCNA-D6.
# Each card follows the exact interface:
# {
#   id: string,
#   category: string,
#   moduleCode: string,
#   moduleName: string,
#   difficulty: 'Fondamental' | 'Intermédiaire' | 'Avancé',
#   frontTitle: string,
#   frontPrompt: string,
#   backTitle: string,
#   backContent: string,
#   rfcRef?: string,
#   cliExample?: string,
#   hint: string
# }

print("Script template ready")
